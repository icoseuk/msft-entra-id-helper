const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['./src/app.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  outfile: './build/app.js'
}).catch(() => process.exit(1))
