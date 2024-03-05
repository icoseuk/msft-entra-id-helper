import axios, { type AxiosResponse } from 'axios'
import qs from 'querystring'

interface GetMicrosoftEntraIdAccessTokenType {
  certificateCredential: string
  tenantId: string
  clientId: string
}

/**
 * Gets an access token for Microsoft Entra ID using certificate credentials.
 *
 * @see https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow#request-an-access-token-with-a-certificate-credential
 *
 * @param certificateCredential The certificate credential.
 * @param tenantId The Microsoft tenant ID.
 *
 * @returns The promise of the access token.
 * @throws AxiosError If the request fails.
 */
const getMicrosoftEntraIdAccessToken = async (
  { certificateCredential, tenantId, clientId }: GetMicrosoftEntraIdAccessTokenType
): Promise<AxiosResponse> => await axios.post(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    qs.stringify({
      client_assertion_type: 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
      client_assertion: certificateCredential,
      grant_type: 'client_credentials',
      scope: `${clientId}/.default`
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
)

export default getMicrosoftEntraIdAccessToken
