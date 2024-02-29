import esbuild from 'esbuild'

esbuild.build({
  entryPoints: ['./src/make-token.ts'],
  bundle: true,
  platform: 'node',
  target: 'esnext',
  outfile: './build/make-token.js'
}).catch(() => process.exit(1))
