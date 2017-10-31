// webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // allows to extract the generated css out of the bundle
const extractLess = new ExtractTextPlugin("dist/[name].css");
module.exports = {
    devServer: {
         // overlay: true is equivalent
      overlay: {
        errors: true,
        warnings: true,
      }
    },
    entry: {
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
                test: /\.js$/,
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
    // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
    plugins: [ extractLess ],
};