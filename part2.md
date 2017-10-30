# Part 2

This part is not covered in the article but I wanted to complete the step to step until we have a full runnning React.js application.

## Using less to transpile to css

**Branch: [scripts](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/006_less)**

**[Diff](./diffs/005_scripts..006_less)** `git diff 005_scripts..006_less`

[Less](http://lesscss.org/) is a CSS pre-processor similar to Sass.

Installation

```npm
npm install less css-loader less-loader extract-text-webpack-plugin style-loader --save-dev
```

Here we use two loaders at the same time. The first one the less-loader (read from bottom to top) will compile Less into CSS then the css-loader will create a style tag that will be injected into your page on run time.
To extract those inline styles into a file on its own we use the [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) to do so.

Webpack configuration looks now like:

```javascript
// webpack.config.js
const ExtractTextPlugin = require("extract-text-webpack-plugin"); // allows to extract the generated css out of the bundle
const extractLess = new ExtractTextPlugin("bundle.css");
module.exports = {
    entry: [
        './index.js',
    ],
    output: {
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
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
```

