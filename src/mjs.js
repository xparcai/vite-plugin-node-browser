import rollupInject from '@rollup/plugin-inject'
import stdLibBrowser from 'node-stdlib-browser'
import esbuildPlugin from 'node-stdlib-browser/helpers/esbuild/plugin'
import { handleCircularDependancyWarning as onWarn } from 'node-stdlib-browser/helpers/rollup/plugin'

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
          inject: [import.meta.resolve('node-stdlib-browser/helpers/esbuild/shim')],
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
                  import.meta.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                  'global',
                ],
                process: [
                  import.meta.resolve('node-stdlib-browser/helpers/esbuild/shim'),
                  'process',
                ],
                Buffer: [
                  import.meta.resolve('node-stdlib-browser/helpers/esbuild/shim'),
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

export default plugin
