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

## Organize the code (folders)

**Branch: [scripts](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/007_folders)**

**[Diff](./diffs/006_less..007_folders)** `git diff 006_less..007_folders`

Showing how to have a basic folder structure and adopting webpack config to extract to a `dist` folder and move all source files to `src`.
 
You will find `[name]` and `[id]` in the configuration file.

- `[id]` is replaced by the id of the chunk.
- `[name]` is replaced by the name of the chunk (or with the id when the chunk has no name).

## Keep your code clean (lint)

Linting is one of those techniques that can help you make fewer mistakes while coding JavaScript. You can spot issues before they become actual problems. Modern editors and IDEs offer strong support for popular tools allowing you to detect possible issues as you are developing.

```npm
npm install eslint eslint-loader --save-dev
```

Basic config file .eslintrc.js:

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "comma-dangle": ["error", "always-multiline"],
    "indent": ["error", 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "always"],
    "no-unused-vars": ["error"],
    "no-console": 0
  }
}
```

Can be run via `npm run lint` with adding in the script section of **package.json**:

```json
{
  "scripts": {
    "lint": "eslint src/js"
  }
}
```

Linting early while development has the benefit that you are forced to write correct code every time you save. 

In **webpack.config.js** you need to define a new loader:

```
{
    enforce: "pre",
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'eslint-loader',
}
```

This will provoke the wepack bundeling to fail. 

To see the error not only in the terminal console but as well in the browser (aka error overlay) we need to add a new section:

```
devServer: {
 // overlay: true is equivalent
  overlay: {
    errors: true,
    warnings: true,
  }
}
```
