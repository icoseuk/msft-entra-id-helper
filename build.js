const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['make-token.ts'],
  bundle: true,
  platform: 'browser',
  target: 'es2017',
  outfile: './build/out.js',
}).catch(() => process.exit(1))