const path = require('path')

module.exports = {
  entry: './src/index.ts',
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mojik.js',
    library: 'Mojik',
    libraryTarget: 'umd',
  },
}
