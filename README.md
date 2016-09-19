raptor-console
==============

学习文档
------------
* [redux](http://rackt.org/redux/)
* [react中文索引](http://nav.react-china.org/)
* [react-router](https://github.com/reactjs/react-router)
* [es6](http://babeljs.io/docs/learn-es2015/)
* [ant-design](http://ant.design/)

Requirements
------------

* node `^4.2.0`
* npm `^3.0.0`

Features
--------

* [React](https://github.com/facebook/react) (`^0.14.0`)
  * Includes react-addons-test-utils (`^0.14.0`)
* [Redux](https://github.com/rackt/redux) (`^3.0.0`)
  * react-redux (`^4.0.0`)
  * redux-devtools
    * use `npm run dev:nw` to display them in a separate window.
  * redux-thunk middleware
* [react-router](https://github.com/rackt/react-router) (`^2.0.0`)
* [react-router-redux](https://github.com/rackt/react-router-redux) (`^3.0.0`)
* [Webpack](https://github.com/webpack/webpack)
  * [CSS modules!](https://github.com/css-modules/css-modules)
  * sass-loader
  * postcss-loader with cssnano for style autoprefixing and minification
  * Bundle splitting for app and vendor dependencies
  * CSS extraction during builts that are not using HMR (like `npm run compile`)
  * Loaders for fonts and images
* [Koa](https://github.com/koajs/koa) (`^2.0.0-alpha`)
  * webpack-dev-middleware
  * webpack-hot-middleware
* [Karma](https://github.com/karma-runner/karma)
  * Mocha w/ chai, sinon-chai, and chai-as-promised
  * [Airbnb's Enzyme](https://github.com/airbnb/enzyme) with [chai-enzyme](https://github.com/producthunt/chai-enzyme)
  * PhantomJS
  * Code coverage reports
* [Babel](https://github.com/babel/babel) (`^6.3.0`)
  * [babel-plugin-transform-runtime](https://www.npmjs.com/package/babel-plugin-transform-runtime) so transforms aren't inlined
  * [babel-preset-react-hmre](https://github.com/danmartinez101/babel-preset-react-hmre) for:
    * react-transform-hmr (HMR for React components)
    * redbox-react (visible error reporting for React components)
  * [babel-plugin-transform-react-constant-elements](https://babeljs.io/docs/plugins/transform-react-constant-elements/) save some memory allocation
  * [babel-plugin-transform-react-remove-prop-types](https://github.com/oliviertassinari/babel-plugin-transform-react-remove-prop-types) remove `PropTypes`
* [ESLint](http://eslint.org)
  * Uses [Standard Style](https://github.com/feross/standard) by default, but you're welcome to change this!
  * Includes separate test-specific `.eslintrc` to support chai assertions

Getting Started
---------------
先装一个淘宝npm镜像[cnpm](http://npm.taobao.org/)

```
$ git clone https://github.com/davezuko/react-redux-starter-kit.git
$ cd react-redux-starter-kit
$ sudo cnpm install                   # Install Node modules listed in ./package.json (may take a while the first time)
$ npm start                     # Compile and launch
```

Usage
-----
开发脚本简介

>* 本地后端[hc.raptor.mogujie.org:8080](hc.raptor.mogujie.org:8080)，
前端[hc.raptor.mogujie.org:3000](hc.raptor.mogujie.org:3000)
* tc测试环境 前端p.tc.console.org
* ic测试环境 前端p.id.console.org

* 本地开发，redux新建窗口?  `npm run dev:nw`
* 本地开发, redux内嵌窗口? `npm start`
* 本地开发  redux不出现?`npm run dev:no-debug`
* 线上发布? `npm run deploy`
* * tc环境? `npm run deploy:tc"`
* * ic环境? `npm run deploy:ic`


* `npm run compile` - Compiles the application to disk (`~/dist` by default).
* `npm run test` - Runs unit tests with Karma and generates a coverage report.
* `npm run test:dev` - Runs Karma and watches for changes to re-run tests; does not generate coverage reports.
* `npm run lint`- Lint all `.js` files.
* `npm run lint:fix` - Lint and fix all `.js` files. [Read more on this](http://eslint.org/docs/user-guide/command-line-interface.html#fix).
*
**NOTE:** Deploying to a specific environment? Make sure to specify your target `NODE_ENV` so webpack will use the correct configuration. For example: `NODE_ENV=production npm run compile` will compile your application with `~/build/webpack/_production.js`.

### Configuration(配置)

基础配置 `~/config/_base.js`. For the most part, you should be able to make changes in here **without ever having to touch the webpack build configuration**. If you need environment-specific overrides, create a file with the name of target `NODE_ENV` prefixed by an `_` in `~/config` (see `~/config/_production.js` for an example).

Common configuration options:

* `dir_src` - application source code base path
* `dir_dist` - path to build compiled application to
* `server_host` - hostname for the Koa server
* `server_port` - port for the Koa server
* `compiler_css_modules` - whether or not to enable CSS modules
* `compiler_devtool` - what type of source-maps to generate (set to `false`/`null` to disable)
* `compiler_vendor` - packages to separate into to the vendor bundle

Structure
---------

The folder structure provided is only meant to serve as a guide, it is by no means prescriptive. It is something that has worked very well for me and my team, but use only what makes sense to you.

```
.
├── bin                      # Build/Start scripts
├── build                    # All build-related configuration
│   └── webpack              # Environment-specific configuration files for webpack
├── config                   # Project configuration settings
├── server                   # Koa application (uses webpack middleware)
│   └── main.js              # Server application entry point
├── src                      # Application source code
│   ├── components           # 全局的通用组件（必须以.jsx结尾）
│   ├── containers           # redux的container组件
│   ├── help           		  # 全局的工具包
│   ├── layouts              # 全页面布局
│   ├── redux
│   │   ├── middleware       # redux中间件
│   │   ├── modules   		  # reudx单路由（页面）模块。
│   │   └── utils            # Redux-specific helpers
│   ├── routes               # 路由配置
│   ├── static               # Static assets (not imported anywhere in source code)
│   ├── styles               # Application-wide styles (generally settings)
│   ├── views                # 单路由（页面）
│   └── main.js              # Application bootstrap and rendering
└── tests                    # Unit tests
```

Webpack
-------

### Vendor Bundle
You can redefine which packages to bundle separately by modifying `compiler_vendor` in `~/config/_base.js`. These default to:

```
[
  'history',
  'react',
  'react-redux',
  'react-router',
  'react-router-redux',
  'redux'
]
```

### Webpack Root Resolve（根路径解析）
Webpack is configured to make use of [resolve.root](http://webpack.github.io/docs/configuration.html#resolve-root), which lets you import local packages as if you were traversing from the root of your `~/src` directory. Here's an example:

```js
// current file: ~/src/views/some/nested/View.js

// What used to be this:
import SomeComponent from '../../../components/SomeComponent'

// Can now be this:
import SomeComponent from 'components/SomeComponent' // Hooray!
```

### Globals（全局变量）

These are global variables available to you anywhere in your source code. If you wish to modify them, they can be found as the `globals` key in `~/config/_base.js`. When adding new globals, also add them to `~/.eslintrc`.

* `process.env.NODE_ENV` - the active `NODE_ENV` when the build started
* `__DEV__` - True when `process.env.NODE_ENV` is `development`
* `__PROD__` - True when `process.env.NODE_ENV` is `production`
* * `__TCPROD__` - True when IC集成编译
* * `__ICPROD__` - True when TC集成编译
* `__TEST__` - True when `process.env.NODE_ENV` is `test`
* `__DEBUG__` - True when `process.env.NODE_ENV` is `development` and cli arg `--no_debug` is not set (`npm run dev:no-debug`)
* `__BASENAME__` - [npm history basename option](https://github.com/rackt/history/blob/master/docs/BasenameSupport.md)

Troubleshooting
---------------

### `npm run dev:nw` produces `cannot read location of undefined.`

This is most likely because the new window has been blocked by your popup blocker, so make sure it's disabled before trying again.被浏览器拦截了窗口了。

Reference: [issue 110](https://github.com/davezuko/react-redux-starter-kit/issues/110)

### High editor CPU usage after compilation

While this is common to any sizable application, it's worth noting for those who may not know: if you happen to notice higher CPU usage in your editor after compiling the application, you may need to tell your editor not to process the dist folder. For example, in Sublime you can add:

```
	"folder_exclude_patterns": [".svn",	".git",	".hg", "CVS",	"node_modules",	"dist"]
```
