import * as jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { createHash } from 'crypto'

/**
 * Encodes a buffer to a base64url string.
 */
function base64urlEncode (data: Buffer): string {
  return data.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

/**
 * Calculates the x5t claim for a certificate.
 */
function calculateX5t (pemCert: string): string {
  // Find the "-----BEGIN PRIVATE KEY-----" line
  const beginCertIndex = pemCert.indexOf('-----BEGIN CERTIFICATE-----')
  if (beginCertIndex === -1) {
    throw new Error('Invalid private key format')
  }

  // Extract the certificate part only
  const certOnly = pemCert.slice(beginCertIndex)

  // Remove the "-----BEGIN PRIVATE KEY-----" and "-----END PRIVATE KEY-----" lines
  const base64Cert = certOnly.replace(/(-----(BEGIN|END) CERTIFICATE-----|[\n\r])/g, '')
  console.log(base64Cert)

  // Convert the Base64 encoded certificate to a Buffer to get the DER format
  const derCert = Buffer.from(base64Cert, 'base64')

  // Calculate SHA-1 hash of the DER formatted certificate
  const sha1 = createHash('sha1').update(derCert).digest()

  // Base64url encode the SHA-1 hash
  return base64urlEncode(sha1)
}

/**
 * Generates a certificate token for Microsoft Entra ID authorization.
 *
 * @see https://learn.microsoft.com/en-us/entra/identity-platform/certificate-credentials
 *
 * @param clientId The client ID of the application.
 * @param tenantId The Microsoft tenant ID.
 * @param x509Certificate The private key of the certificate.
 * @param certificateThumbprint The thumbprint of the certificate.
 *
 * @returns The certificate authorization token.
 */
const generateCertificateCredential = (
  clientId: string,
  tenantId: string,
  certificateThumbprint: string,
  x509Certificate: string,
  privateKey: string
): string => jwt.sign({
  aud: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
  exp: Math.floor(Date.now() / 1000) + (10 * 60), // 10 minutes
  iss: clientId,
  jti: v4(),
  nbf: Math.floor(Date.now() / 1000) - 60,
  sub: clientId,
  iat: Math.floor(Date.now() / 1000)
}, privateKey, {
  header: {
    alg: 'RS256',
    kid: certificateThumbprint,
    typ: 'JWT',
    x5t: calculateX5t(x509Certificate)
  }
})

export default generateCertificateCredential
