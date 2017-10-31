# Part 2

This part is not covered in the article but I wanted to complete the step to step until we have a state-of-the-art js-application. 
We will cover the remaining areas that every javascript based app should provide to ensure code quality. 
The last step is to add [react](https://reactjs.org/) which the reader may change to any other given framework like [vue](https://vuejs.org/) et. al.

## Using less to transpile to css ([less](http://lesscss.org/))

**Branch: [scripts](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/006_less)**

**[Diff](./diffs/005_scripts..006_less)** `git diff 005_scripts..006_less`

[Less](http://lesscss.org/) is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themeable and extendable.

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

## Organize the code ([folders](https://github.com/webpack/docs/wiki/configuration))

**Branch: [scripts](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/007_folders)**

**[Diff](./diffs/006_less..007_folders)** `git diff 006_less..007_folders`

Showing how to have a basic folder structure and adopting webpack config to extract to a `dist` folder and move all source files to `src`.
 
You will find `[name]` and `[id]` in the configuration file.

- `[id]` is replaced by the id of the chunk.
- `[name]` is replaced by the name of the chunk (or with the id when the chunk has no name).

## Keep your code clean ([lint](https://eslint.org/))
**Branch: [scripts](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/008_lint)**

**[Diff](./diffs/007_folders..008_lint)** `git diff 007_folders..008_lint`


Code linting is a type of static analysis that is frequently used to find problematic patterns or code that doesn’t adhere to certain style guidelines. There are code linters for most programming languages, and compilers sometimes incorporate linting into the compilation process.

JavaScript, being a dynamic and loosely-typed language, is especially prone to developer error. Without the benefit of a compilation process, JavaScript code is typically executed in order to find syntax or other errors. Linting tools like ESLint allow developers to discover problems with their JavaScript code without executing it.

The primary reason ESLint was created was to allow developers to create their own linting rules. ESLint is designed to have all rules completely pluggable. The default rules are written just like any plugin rules would be. They can all follow the same pattern, both for the rules themselves as well as tests. While ESLint will ship with some built-in rules to make it useful from the start, you’ll be able to dynamically load rules at any point in time.

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
    "node": true
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

## Prevent regressions with tests ([jest](https://facebook.github.io/jest/))

**Branch: [tests](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/009_tests)**

**[Diff](./diffs/008_lint..009_tests)** `git diff 008_lint..009_tests`

There are many different plattforms to write tests. 
The article [An Overview of JavaScript Testing in 2017](https://medium.com/powtoon-engineering/a-complete-guide-to-testing-javascript-in-2017-a217b4cd5a2a) 
explains the different types of tests:

- **Unit Tests** Testing of individual functions or classes by mocking input and making sure the output is as expected.
- **Integration Tests** Testing several modules to ensure they work together as expected.
- **Functional Tests** Testing a scenario on the product itself (on the browser, for example) regardless of the internal structure to ensure expected behavior.

The two most common test frameworks in the javascript world are probably [mocha](https://github.com/mochajs/mocha) and [jest](https://facebook.github.io/jest/). 
I have used both for a while and lately am using more jest due to the code coverage feature and the parallelized test runs across workers to maximize performance.

### Steps to follow
To support the jest testing without any config we need to prepare/change our project structure a bit. First of all we need to isolate the import from the less files which is triggering the generation of our css.

If we leave `import '../less/index.less';` in our index.js we will run into an error in jest, since it does not understand `less`.
We will move that import to a file on its own `common.js` and create a new `entrypoint` in the webpack config to tell about the new file so it will be bundled. 

That however will not create the `index.css` anymore but now it will generate `common.css`
Further we will move the babel option that we earlier defined in `webpack.config.js` to a 
file on its own `.babelrc` to make it globally available. `Jest` will pick up this file and "knows" that we will use ES6.

To have actually something to test we will implement a method in `index.js` and export it.

**.babelrc**

```json
{
  "presets": ["env"]
}
```

**webpack.config.js** babel loader **BEFORE**

```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['env']
        }
    }
}
```

**webpack.config.js** babel loader **AFTER**

```javascript
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: 'babel-loader'
}
```

**index.html** **BEFORE**
```html
<link href="dist/index.css" rel="stylesheet" title="Default Style"/>
```

**index.html** **AFTER**
```html
<!-- generated the css we want to use -->
<script src="dist/common.js"></script>
<!-- link the generated css -->
<link href="dist/common.css" rel="stylesheet" title="Default Style"/>
```

**index.js** new method

```javascript
export const sum = (a, b) => a + b;
```

After this preparation we can now create a file `test/index.spec.js` with we will test our new method. Placing it in 
the test folder and giving it the spec.js extension will tell jest to test this file (no configuration needed).

```javascript
import { sum } from '../src/js/index';
describe('Test the index.js', () => {
    it('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    })
});
```

To wrap up we will change our bundle npm script to only bundle if we pass linting and testing.
```npm
"bundle": "npm run lint && npm test && npm run build",
```

## add code coverage, configure jest

There are many ways to configure jest to your specific needs, 
however to activate code coverage we actually do not need to create a config or such. 
We can simply pass a flag to `jest` in our `package.json` which actually is one form of configure `jest`.

```npm
"test": "jest --coverage",
```

You can find all different ways to [configure](https://facebook.github.io/jest/docs/en/configuration.html) jest in their documentation.
In this tutorial we will concentrate on the `package.json`.

Instead to use the above flag we can extend our `package.json` and add a new "top-level" child like:

```json
{
    "name": "modern-js4dinosaurs",
    "jest": {
        "collectCoverage": true
    }   
}
```

You can use different test reporters but we will show how to use the [junit](http://junit.org/) format which is widely 
supported by different tools like e.g. [jenkins](https://jenkins.io/). 

```json
{
    "name": "modern-js4dinosaurs",
    "jest": {
        "collectCoverage": true,
        "testResultsProcessor": "jest-junit"
    },
    "jest-junit": {
        "suiteName": "tests for modern javascript",
        "output": "./dist/junit.xml",
        "classNameTemplate": "{classname}",
        "titleTemplate": "{title}",
        "usePathForSuiteName": "true"
    }  
}
```

### TDD - test driven development

Test-driven development (TDD) is a software development process that relies on the repetition of a very short development cycle: first the developer writes an (initially failing) automated test case that defines a desired improvement or new function, then produces the minimum amount of code to pass that test, and finally refactors the new code to acceptable standards.

The following sequence of steps is generally followed:

- Add a test
- Run all tests and see if the new one fails
- Write some code
- Run tests
- Refactor code
- Repeat

`jest` comes out-of-the-box with the support to watch all test files and in case they change it will run the test again. 
This allows to concentrate on coding and simply have the terminal in sight to see when tests are failing.

We simply declare a new npm script as follows.

```json
"test:watch": "jest --watch",
```