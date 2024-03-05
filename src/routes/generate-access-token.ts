import { type Request, type Response, type RequestHandler } from 'express'
import getMicrosoftEntraIdAccessToken from '../utils/get-microsoft-entra-id-access-token'
import generateCertificateCredential from '../utils/generate-certificate-credential'
import { AxiosError } from 'axios'

declare module 'express-serve-static-core' {
  interface Request {
    files: Record<string, Express.Multer.File[]>
  }
}

// eslint-disable-next-line @typescript-eslint/no-misused-promises
const generateAccessToken: RequestHandler = async (req: Request, res: Response) => {
  try {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { tenant_id, client_id, certificate_thumbprint } = req.body as {
      tenant_id: string
      client_id: string
      certificate_thumbprint: string
    }
    const certificate = req.files?.certificate[0] as { buffer: Buffer }
    const privateKey = req.files?.private_key[0] as { buffer: Buffer }

    if (tenant_id === undefined ||
        client_id === undefined ||
        certificate === undefined ||
        certificate_thumbprint === undefined ||
        privateKey === undefined
    ) {
      res.status(400).json({ error: 'Missing tenant_id, client_id, certificate_thumbprint or certificate' })
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // res.send(generateCertificateCredential(client_id, tenant_id, certificate_thumbprint, certificate.buffer.toString('utf-8')))

    const response = await getMicrosoftEntraIdAccessToken({
      certificateCredential: generateCertificateCredential(
        client_id,
        tenant_id,
        certificate_thumbprint,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        certificate.buffer.toString('utf-8'),
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        privateKey.buffer.toString('utf-8')
      ),
      tenantId: tenant_id,
      clientId: client_id
    })

    // Forward the status, headers, and body to the client
    res.status(response.status)
    res.set(response.headers)
    res.send(response.data)
  } catch (error) {
    // Forward the error status, headers, and body to the client
    if (error instanceof AxiosError) {
      res.status(error.response?.status ?? 500)
      res.set(error.response?.headers)
      res.send(error.response?.data)
    } else {
      res.status(500).send((error as Error).toString())
    }
  }
}

export default generateAccessToken
