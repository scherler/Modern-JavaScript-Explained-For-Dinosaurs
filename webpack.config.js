// webpack.config.js
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // allows to extract the generated css out of the bundle
const extractLess = new ExtractTextPlugin("dist/[name].css");
module.exports = {
    devServer: {
         // overlay: true is equivalent
      overlay: {
        errors: true,
        warnings: true,
      },
      historyApiFallback: true
    },
    entry: {
        "vendor": [
          "expose-loader?React!react",
          "expose-loader?ReactDOM!react-dom",
          "expose-loader?moment!moment",
        ],
        index: './src/js/index.js',
        common: './src/js/common.js',
    },
    output: {
        filename: 'dist/[name].js',
        chunkFilename: "dist/[id].bundle.js"
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'eslint-loader',
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: extractLess.extract({
                    use: ["css-loader"],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: extractLess.extract({
                    use: [ "css-loader", "less-loader"],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
        ],
    },
    externals: {
        // Use external version of React
        "react": "React",
        "react-dom": "ReactDOM",
        "moment": "moment"
    },
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [
        extractLess,
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity,
            async: true
        })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
};