import * as jwt from 'jsonwebtoken'

/**
 * Generates a certificate token for Microsoft Entra ID authorization.
 *
 * @see https://learn.microsoft.com/en-us/entra/identity-platform/certificate-credentials
 *
 * @param clientId The client ID of the application.
 * @param tenantId The Microsoft tenant ID.
 * @param x509privateKey The private key of the certificate.
 * @param certificateThumbprint The thumbprint of the certificate.
 *
 * @returns The certificate authorization token.
 */
const generateCertificateCredential = (
  clientId: string,
  tenantId: string,
  certificateThumbprint: string,
  x509privateKey: string
): string => jwt.sign({
  aud: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
  exp: Math.floor(Date.now() / 1000) + (10 * 60), // 10 minutes
  iss: clientId,
  jti: Math.random().toString(36).substring(7),
  nbf: Math.floor(Date.now() / 1000) - 60,
  sub: clientId,
  iat: Math.floor(Date.now() / 1000)
}, x509privateKey, {
  header: {
    alg: 'RS256',
    typ: 'JWT',
    x5t: certificateThumbprint
  }
})

export default generateCertificateCredential
