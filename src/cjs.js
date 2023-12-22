const rollupInject = require('@rollup/plugin-inject')
const stdLibBrowser = require('node-stdlib-browser')
const esbuildPlugin = require('node-stdlib-browser/helpers/esbuild/plugin')
const { handleCircularDependancyWarning: onWarn } = require('node-stdlib-browser/helpers/rollup/plugin')

function plugin() {
  return {
    name: 'vite-plugin-node-browser',
    config: () => ({
      resolve: {
        alias: stdLibBrowser,
      },
      optimizeDeps: {
        include: ['buffer', 'process'],
        esbuildOptions: {
          inject: [require.resolve('node-stdlib-browser/helpers/esbuild/shim')],
          define: {
            global: 'global',
            process: 'process',
            Buffer: 'Buffer',
          },
          plugins: [
            esbuildPlugin(stdLibBrowser),
            {
              name: 'fixed-node-stdlib-browser-shim',
              setup(build) {
                build.onResolve(
                  { filter: /node-stdlib-browser\/helpers\/esbuild\/shim/ },
                  ({ path }) => ({ path }),
                )
              },
            },
          ],
        },
      },
      build: {
        rollupOptions: {
          onwarn: (warning, rollupWarn) => onWarn(warning, rollupWarn),
          plugins: [
            {
              ...rollupInject({
                global: [
                  require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                  'global',
                ],
                process: [
                  require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                  'process',
                ],
                Buffer: [
                  require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                  'Buffer',
                ],
              }),
            },
          ],
        },
      },
    }),
  }
}

module.exports = plugin
