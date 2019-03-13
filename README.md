# react-minimal-skeleton

*Note: This only includes basic webpack setup. Testing, Formatting, and Linting are coming soon.*

## Mimic this setup without forking

1. Create the directory 

*Note: If you already have a repo clone the repo and skip this step*

```sh
mkdir my-app-name
```

2. Open the project directory

```sh
cd my-app-name
```

3. Initialize the package

```sh
yarn init
```

Feel free to hit enter through all or fill in the correct date. Note: I usually set `private` to `true`

4. Install the initial packages for running and building the app

```sh
yarn add \
  react \
  react-dom \
  webpack \
  webpack-cli \
  webpack-dev-server \
  copy-webpack-plugin \
  html-webpack-plugin \
  typescript \
  ts-loader \
  @types/react \
  @types/react-dom \
  @types/webpack
```

5. Create the initial files and folders

```sh
mkdir src public
touch \
  tsconfig.json \
  webpack.config.js \
  src/index.tsx \
  public/index.html
```

6. Add initial config to tsconfig.json

```json
{
  "compilerOptions": {
    "allowJs": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "jsx": "react",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "es2016"
  },
  "include": [
    "src"
  ]
}
```

7. Add initial config to webpack.config.js

```js
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const srcDir = resolve(__dirname, './src');
const distDir = resolve(__dirname, './dist');
const publicDir = resolve(__dirname, './public');

const appIndexFile = join(publicDir, 'index.html');

module.exports = (env = {}) => {
  const isProduction = Boolean(env.prod);

  return {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'source-map' : 'eval',
    entry: join(srcDir, 'index.tsx'),
    output: {
      path: distDir,
      publicPath: '/',
      filename: isProduction ? '[name].[chunkhash].js' : '[name].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.mjs', '.js']
    },
    plugins: [
      new CopyWebpackPlugin([
        {
          from: '**/*',
          to: distDir,
          context: publicDir,
          ignore: [appIndexFile]
        }
      ]),
      new HtmlWebpackPlugin({
        template: appIndexFile
      })
    ],
    devServer: {
      port: 8080,
      publicPath: '/',
      historyApiFallback: true,
      stats: {
        modules: false
      }
    }
  };
};
```

8. Add scripts to package.json

```diff
{
  "name": "my-app-name",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.tsx",
  "repository": "",
  "author": "",
  "license": "MIT",
  "private": true,
+ "scripts": {
+   "build": "webpack --env.prod",
+   "start: "webpack-dev-server"
+ },
  "dependencies": { ... }
}
```

9. Setup index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <meta name="theme-color" content="#000000" />
    <title>My App Name</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
```

10. Setup src/index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>Hello World</div>, document.getElementById('root'));
```

11. Run the start script

```sh
yarn start
```

Voila, you now have a minimal running React/TypeScript/Webpack setup.