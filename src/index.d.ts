declare module 'node-stdlib-browser/helpers/esbuild/plugin' {
  import type { Plugin } from 'esbuild'

  function esbuildPlugin(lib: { [key: string]: string }): Plugin
  export default esbuildPlugin
}

declare module 'node-stdlib-browser/helpers/rollup/plugin' {
  import type { LoggingFunction, RollupLog } from 'rollup'

  function handleCircularDependancyWarning(warning: RollupLog, warningHandler: LoggingFunction): void
  export {
    handleCircularDependancyWarning,
  }
}

declare module 'vite-plugin-node-browser' {
  import type { PluginOption } from 'vite'

  function vitePlugin(): PluginOption
  export default vitePlugin
}
