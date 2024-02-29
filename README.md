# 🚀 Microsoft Identity JWT Token Generator

This project contains a script for generating JSON Web Tokens (JWTs) for Microsoft Identity services using a private key. The script is written in TypeScript and bundled for browser usage using esbuild. 

## Deployment Instructions

1. Run the Docker container with the necessary environment variables and volume binding. Replace <path_to_your_pem_file> with the path to your .pem file on your local machine:

```dockerfile
docker run -d -p 8888:8888 \
  -e MICROSOFT_CLIENT_ID=<your_client_id> \
  -e MICROSOFT_TENANT_ID=<your_tenant_id> \
  -v <path_to_your_pem_file>:/srv/certs/privatekey.pem \
  ghcr.io/icoseuk/msft-jwt-builder
```

In the above command:

- `-d` runs the container in detached mode (in the background).
- `-p` 8888:8888 maps port 8888 of the container to port 8888 on the host machine.
- `-e` sets the environment variables MICROSOFT_CLIENT_ID and MICROSOFT_TENANT_ID.
- `-v` binds the volume <path_to_your_pem_file> on the host to /srv/certs/privatekey.pem in the container.

3. The application should now be running and accessible at http://localhost:8888/generate-token.