# 🚀 Microsoft Identity JWT Token Generator

This project contains a script for generating JSON Web Tokens (JWTs) for Microsoft Identity services using a private key. The script is written in TypeScript and bundled for browser usage using esbuild. 

## 🎯 Purpose

The `make-token.ts` script generates a JWT based on a given client ID, tenant, and a path to a private key certificate. This token can be used for authenticating with services that require a JWT for authentication.

## 🛠️ Setup

1. Clone this repository to your local machine.
2. Navigate to the project root directory in your terminal.
3. Run `npm install` to install the necessary dependencies.

## 🏗️ Build

To build the project, run the following command in your terminal:

```bash
npm run build
```

This command bundles the TypeScript code and its dependencies into a single JavaScript file that can be included in a browser. The output file is located in the `build` directory at the project root.

## 🌐 Usage in Browser

After building the project, you can include the output file in your HTML file:

```html
<script src="/path/to/build/out.js"></script>
```

Please note that reading files in the browser is a complex task and might not work as expected. You might need to adjust your approach based on your specific use case.

## 🎉 That's it! 

You're all set to generate JWTs in the browser! Enjoy your coding journey! 🚀