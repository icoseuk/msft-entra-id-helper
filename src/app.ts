import express from 'express'
import multer from 'multer'
import generateAccessToken from './routes/generate-access-token'

// Initializations
const app = express()
const upload = multer()

/**
 * Generates an access token for Microsoft Entra ID using certificate credentials.
 */
app.post('/generate-access-token', upload.fields([{ name: 'certificate', maxCount: 1 }, { name: 'private_key', maxCount: 1 }]), generateAccessToken)

app.listen(8888, () => {
  console.log('Server is running on http://localhost:8888')
})
