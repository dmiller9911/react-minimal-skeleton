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
