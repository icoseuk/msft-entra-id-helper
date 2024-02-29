import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'

export default function createToken (certificatePath: string): string {
  // Read the certificate file
  const privateKey = fs.readFileSync(certificatePath)

  // Read the clientId and tenant from the environment
  const clientId = process.env.MICROSOFT_CLIENT_ID
  const tenant = process.env.MICROSOFT_TENANT_ID

  if (clientId === undefined || tenant === undefined) {
    throw new Error('MICROSOFT_CLIENT_ID or MICROSOFT_TENANT_ID environment variables are not defined')
  }

  // Define the token contents
  const payload = {
    sub: clientId,
    iss: clientId,
    aud: `https://login.microsoftonline.com/${tenant}/oauth2/v2.0/token`,
    exp: Math.floor(Date.now() / 1000) + (10 * 60) // Expires in 10 minutes
  }

  // Sign the token
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' })

  return token
}
