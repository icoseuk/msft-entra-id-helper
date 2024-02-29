import express from 'express'
import createToken from './make-token'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const certificatePath = '/srv/certs/privatekey.pem'

function getCertificatePath (): string {
  if (!fs.existsSync(certificatePath)) {
    throw new Error('Certificate not found')
  }
  return certificatePath
}

app.get('/generate-token', (_req: express.Request, res: express.Response) => {
  try {
    const certificatePath = getCertificatePath()
    const token = createToken(certificatePath)
    res.json({ token })
  } catch (error: unknown) {
    res.status(500).json({ error: (error as Error).toString() })
  }
})

app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888')
})
