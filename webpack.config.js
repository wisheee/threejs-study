const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const webpackMode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: './src/js/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({ filename: 'css/style.css' }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'images/',
          publicPath: 'images/',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          outputPath: 'fonts/',
          filename: '[name][ext]',
        },
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules|bower_components)/,
        use: ['babel-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: './dist',
    watchFiles: ['src/**/*'],
    liveReload: true,
  },
  devtool: 'source-map',
  mode: webpackMode,
};
