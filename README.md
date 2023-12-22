# vite-plugin-node-browser

[![NPM version](https://img.shields.io/npm/v/vite-plugin-node-browser?color=a1b858&label=)](https://www.npmjs.com/package/vite-plugin-node-browser)

> vite-plugin-node-browser for [vite](https://github.com/vitejs/vite).
> 
> Based on [node-stdlib-browser](https://github.com/niksy/node-stdlib-browser).  
> 
> Support vite5, forked from [vite-plugin-node-stdlib-browser](https://github.com/sodatea/vite-plugin-node-stdlib-browser)

## Install

```bash
npm i vite-plugin-node-browser
```

## Usage

```js
// vite.config.js
import NodeBrowser from 'vite-plugin-node-browser'

export default defineConfig({
  plugins: [
    NodeBrowser({
      /* options */ 
    })
  ],
})
```

## License

[MIT](./LICENSE) License © 2023 [xparcai](https://github.com/xparcai)
