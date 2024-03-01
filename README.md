# 🔑 Microsoft Entra ID Helper

This project contains a script for generating JSON Web Tokens (JWTs) for Microsoft Identity services using a private key. The script is written in TypeScript and bundled for browser usage using esbuild.

## Table of Contents

- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)


## Deployment

1. Make sure you have Docker installed on your machine. If not, you can download it from the [official website](https://www.docker.com/products/docker-desktop).
1. Run the Docker container using the following command:

```dockerfile
docker run -d -p 80:8888 ghcr.io/icoseuk/msft-entra-id-helper:latest
```

In the above command:

- `-p 80:8888` maps port `8888` of the container to port `80` on the host machine, making the application accessible at `http://localhost/generate-token`. You can modify the host port as needed as long as it does not conflict with other services running on the host machine.

3. The application should now be running and accessible at http://localhost/.

## API Endpoints

The following endpoints are available:

- `/generate-access-token`: Generates a Microsoft Entra ID access token using certificate credentials.
  - Method: `POST`
  - Headers:
    - `Content-Type: application/www-form-urlencoded`
  - Body:
    - `client_id`: The client ID of the application.
    - `tenant_id`: The tenant ID of the application.
    - `certificate_thumbprint`: The thumbprint of the certificate.
    - `certificate`: The certificate file in PEM format (file upload).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE.md) file for details.
```