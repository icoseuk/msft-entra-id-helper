# 🔑 Microsoft Entra ID Helper

A simple service to help with [Microsoft Entra ID certificate-based authentication](https://learn.microsoft.com/en-us/entra/identity-platform/certificate-credentials).

[![🚀 Build and Publish](https://github.com/icoseuk/msft-entra-id-helper/actions/workflows/build.yml/badge.svg)](https://github.com/icoseuk/msft-entra-id-helper/actions/workflows/build.yml)

## Table of Contents

- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [License](#license)


## Deployment

1. Make sure you have Docker installed on your machine. If not, you can download it from the [official website](https://www.docker.com/products/docker-desktop).
1. Run the Docker container using the following command:

```dockerfile
docker run -d -p 80:8888 ghcr.io/icoseuk/msft-entra-id-helper:latest
```

In the above command:

- `-p 80:8888` maps port `8888` of the container to port `80` on the host machine, making the application accessible at `http://localhost/generate-access-token`. You can modify the host port as needed as long as it does not conflict with other services running on the host machine.

3. The application should now be running and accessible at http://localhost/.

## API Endpoints

The following endpoints are available:

- `/generate-access-token`: Generates a Microsoft Entra ID access token using certificate credentials.
  - Method: `POST`
  - Headers:
    - `Content-Type: multipart/form-data`
  - Body:
    - `client_id`: The client ID of the application.
    - `tenant_id`: The tenant ID of the application.
    - `certificate_thumbprint`: The thumbprint of the certificate.
    - `certificate`: The certificate file (file upload).
    - `private_key`: The private key file (file upload).
  - Response: The respose will be a JSON object containing the access token and its expiry date, or an error message if the request fails. Check the [relevant Microsoft documentation](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow#successful-response-2) for more details on the response object.

## Development

This repository is configured for development using [Visual Studio Code](https://code.visualstudio.com) and  [Dev Containers](https://code.visualstudio.com/docs/remote/containers) with all the necessary dependencies and debugging scripts. You can read up on the official documentation on how to set up your development environment using Dev Containers, or simply click the badge below to launch GitHub Codespaces.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/icoseuk/msft-entra-id-helper)

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.