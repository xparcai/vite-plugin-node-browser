import type { PluginOption } from 'vite'
import type { Options } from './types'

function createPlugin(options?: Options): PluginOption {
  return {
    name: 'vite-plugin-node-browser',
    transform(code, id: string) {
      if (id.endsWith('main.ts'))
        return code.replace('__PLUGIN__', `Hello Vite Plugin! ${options}`)
      return null
    },
  }
}

export default createPlugin
