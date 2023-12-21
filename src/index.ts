import type { PluginOption } from 'vite'
import rollupInject from '@rollup/plugin-inject'
import stdLibBrowser from 'node-stdlib-browser'
import esbuildPlugin from 'node-stdlib-browser/helpers/esbuild/plugin'
import { handleCircularDependancyWarning } from 'node-stdlib-browser/helpers/rollup/plugin'
import type { LoggingFunction, RollupLog } from 'rollup'

function createPlugin(): PluginOption {
  return {
    name: 'vite-plugin-node-browser',
    config: () => ({
      resolve: {
        alias: stdLibBrowser,
      },
      optimizeDeps: {
        include: ['buffer', 'process'],
        esbuildOptions: {
          inject: [
            require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
          ],
          define: {
            Buffer: 'Buffer',
            process: 'process',
            global: 'global',
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
          onwarn: (warning: RollupLog, rollupWarn: LoggingFunction) => {
            handleCircularDependancyWarning(warning, rollupWarn)
          },
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

export default createPlugin
