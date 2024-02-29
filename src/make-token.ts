import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'

export default function createToken (clientId: string, tenant: string, certificatePath: string): string {
  // Read the certificate file
  const privateKey = fs.readFileSync(certificatePath)

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
