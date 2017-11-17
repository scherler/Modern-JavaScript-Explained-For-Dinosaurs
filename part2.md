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

## Integrate react ([react](https://facebook.github.io/react/))

**Branch: [react](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/010_react)**

**[Diff](./diffs/009_tests..010_react)** `git diff 009_tests..010_react`

### What is React?

There exist different definition of what react is. React is often described as “the V in the MVC structure”. 
This also happens to be the least tangible explanation one could give a newcomer, as (V)iews are typically
logic-less files that are driven by a controller. Further, frameworks like Angular, Backbone, Ember, and more 
already have sufficient view layers — which then begs the question, why do we need to replace the V in MVC with React?
                                                   
The answer is that React doesn’t necessarily want to replace our views — it wants to augment them by allowing you to create 
highly reusable UI components (tab bars, comment boxes, pop up modals, lists, sortable tables, etc).

In other words, the big idea behind React is this: what if you could create your own HTML element that has customized 
functionality? For example, one could make a <CommentBox> element that would display a textarea, run validations on the 
text typed into the textarea, submits the form when the enter key is pressed, etc — all just by including one line of code: 
<CommentBox></CommentBox>. (For those of you coming from the Angular world, you can think of React Components as a close analogy to Directives).

When I first got in touch with react I thought it would be like **XML**, since I have a strong background in XSL, XML et.al..
...but I soon had to learn that they have **nothing in common**.

### First render with react

Let us now create a first integration which we will further enhance later on. Our first stab is to inject all dependencies
in our components, the steps to do so are the following:

- tell `babel` about the special syntax that react brings to the plate. In our `.babelrc` we need to add a new preset 
```json
{
  "presets": ["env", "react"]
}
```
- tell `eslint` about the special syntax that react brings to the plate. In our `.eslintrc` we need to add a new parser, 
extend the rules for react and add the react pluggin
```json
{
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
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
  },
  "plugins": ["react"]
}
```
- install the following npm packages
```npm
npm i -S -E react react-dom
npm i -D -E babel-eslint babel-preset-react eslint-plugin-react

```
- extend our `common.js` 
```javascript
import '../less/index.less'; // tell webpack to request the transpiling of less to css
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('react');
ReactDOM.render(<div>Hello React!</div>, root);
```
- as you can see we are trying to render React in element with the id `react`. That needs to be added to our index.html
```html
<div id="react"></div>
```

### Enhance bundle size and loading times

Our current bundle size has grown quite a bit, even if we have really not much javascript developed. 
So common.js is around 115kB and index.js has grown to 252kB. That does not sound much at the moment but 
as more dependencies we are using the bigger the bundles for each page are growing.

The solution is to tell webpack that we will use some common libaries like react and moment as external files
so webpack will not bundle them into our different files. That has as well the benefit that this `vendor` bundle can be 
cached by the browser which makes loading each next page **much** faster in comparision on what we had before.

First install the following npm package
```npm
npm i -D -E expose-loader

```

For that we need to change our `entry` section webpack.config.js to the following, which is using the `expose-loader` which adds 
modules to the global object:

```json
entry: {
    "vendor": [
      "expose-loader?React!react",
      "expose-loader?ReactDOM!react-dom",
      "expose-loader?moment!moment",
    ],
    index: './src/js/index.js',
    common: './src/js/common.js',
},
```

and add a new section `externals` to the same file which tell webpack
that we do not want to bundle those libraries:

```json
externals: {
    // Use external version of React
    "react": "React",
    "react-dom": "ReactDOM",
    "moment": "moment"
},
```

From here we can either use a `CDN` of those external libs or we can include the vendor bundle
in our index.html:

```html
<script src="dist/vendor.js"></script>
```

That has the effect that our page bundles (index and common) had been 
reduced to around 800 bytes and the vendor bundle containing all our deps 
with 370 kB. 
 
By separating common modules from bundles, the resulting chunked 
file can be loaded once initially, and stored in cache for later use. 
This results in pagespeed optimizations as the browser can quickly serve the shared 
code from cache, rather than being forced to load a larger bundle whenever a new page is visited.


## React App ([react](https://facebook.github.io/react/))

**Branch: [react_app](https://github.com/scherler/Modern-JavaScript-Explained-For-Dinosaurs/tree/011_react_app)**

**[Diff](./diffs/010_react..011_react_app)** `git diff 010_react..011_react_app`

Now that we have a nice performing integration of react let us create our first react app.

### Our first component

We recommend the official [react tutorial](https://reactjs.org/tutorial/tutorial.html) to get a full overview of what you can do.

Our first component is to extract `<div>Hello React!</div>` from

```javascript
ReactDOM.render(<div>Hello React!</div>, root);
```

We will create src/js/components/Hello.jsx with the following content:

```javascript
import React, { Component } from 'react';

export class Hello extends Component {
    render() {
        return (<div>Hello React!</div>);
    }
}
```

and our `common.js` will become

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { Hello } from './components/Hello';
import '../less/index.less'; // tell webpack to request the transpiling of less to css

const root = document.getElementById('react');
ReactDOM.render(<Hello />, root);
```

However when you try bundle our app you will get an error like:

```bash
ERROR in ./src/js/common.js
Module not found: Error: Can't resolve './components/Hello' in '/opt/src/mysterion/Modern-JavaScript-Explained-For-Dinosaurs/src/js'
 @ ./src/js/common.js 11:13-42
Child extract-text-webpack-plugin node_modules/extract-text-webpack-plugin/dist node_modules/css-loader/index.js!node_modules/less-loader/dist/cjs.js!src/less/index.less:
       [0] ./node_modules/css-loader!./node_modules/less-loader/dist/cjs.js!./src/less/index.less 213 bytes {0} [built]
        + 1 hidden module
```

That is because by default `webpack` resolves only files that ends with `.js`. We need to add the following element to our `webpack.config.js`
```
resolve: {
  extensions: ['.js', '.jsx']
}
```

and change our test for the js extension to: `test: /\.js$|\.jsx$/,` in our rules.

Our `Hello` component can be as well written very differently but outputting the exact same thing:

```javascript
export const Hello2 = () => (<div>Hello React!</div>);
```

This is called a `stateless functional component` and is useful for dumb/presentational components. 
> Presentational components focus on the UI rather than behavior, so it’s important to avoid using state in presentational components.
> <cite>[React Stateless Functional Components](https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc) </cite>

#### props

Any given react component accepts parameters which are called [`props`](https://reactjs.org/docs/components-and-props.html):

```javascript
import React, { Component } from 'react';

export class Hello extends Component {
    render() {
        const { from } = this.props;
        return (<div>Hello React!</div>);
    }
}

export const Hello2 = ({from}) => (<div>Hello React from {from}!</div>);
```

In our common.js we do now `<Hello from="common.js"/>` and see something like `Hello React from common.js!` in the resulting html.

As side note `({from})` in the `Hello2` component is the same as `(props)` and then doing `const {from} = props` 

#### PropTypes

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special [propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html#proptypes) property.

React.PropTypes has moved into a different package since React v15.5. We need to use the prop-types library instead `npm i -D -E prop-types`

```javascript
Hello.propTypes = {
    from: PropTypes.string,
};

Hello2.propTypes = Hello.propTypes;
```

Now if we e.g. pass a number from common.js `<Hello from={1} />` we will see in the console:

```
Warning: Failed prop type: Invalid prop `from` of type `number` supplied to `Hello2`, expected `string`.
    in Hello2
```

#### defaultProps

defaultProps can be defined as a property on the component class itself, to set the default props for the class. This is used for undefined props, but not for null props.

```javascript
Hello.defaultProps = {
    from: 'Hello.jsx'
};
```

Then using `<Hello/>` will return `Hello React from Hello.jsx!`

In case you are using es6 you can do the same without having to use `defaultProps`, so `<Hello2 />` will return
`Hello React from Hello2!` when lokking like:

```javascript
export const Hello2 = ({from = 'Hello2'}) => (<div>Hello React from {from}!</div>);
```

**HEADSUP** if you pass `null` as value for `from` you will see in both cases `Hello React from !`

#### props.children

props.children is available on every component. It contains the content between the opening and closing tags of a component. For example:

```javascript
ReactDOM.render(<Hello2>I am a child</Hello2>, root);
```

and 

```javascript
export const Hello2 = ({from = 'Hello2', children}) => (<div>
    Hello React from {from}!
    { children && <p>{children}</p>}
</div>);

```

will render

```html
<div>Hello React from Hello2!<p>I am a child</p></div>
```

The expression `{ children && <p>{children}</p>}` means if children are not null return the `<p/>` expression.

Until now we could only use one component in our common.js this is not practical on the long run. Here `composing components` are coming in handy.

#### composing components

Components can refer to other components in their output. This lets us use the same component abstraction for any level of detail. A button, a form, a dialog, a screen: in React apps, all those are commonly expressed as components.

Let us create an `App` component (we using a new feature of v.16: you can now return an array of elements from a component’s render method.):

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hello, Hello2 } from './Hello';

export class App extends Component {
    // No need to wrap list items in an extra element!
    render() {
        // Don't forget the keys :)
        return [ <Hello key="1"/>, <Hello2 key="2"/>]
    }
}

App.propTypes = {
    children: PropTypes.node,
};
```

#### refactor index.html use a Layout component

Let us refactor our index.hmtl to be a simple skeleton and not returning any content on its own:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>JavaScript Example</title>
        <!-- link the generated css -->
        <link href="dist/common.css" rel="stylesheet" title="Default Style"/>
    </head>
    <body>
        <div id="react"></div>
        <!-- generated the css we want to use AND mount React -->
        <script src="dist/vendor.js"></script>
        <script src="dist/common.js"></script>
        <script src="dist/index.js"></script>
    </body>
</html>
```

Layout.jsx:

```javascript
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Layout extends Component {
    render() {
        return (<div className="container">
        <div className="content">
            {this.props.children}
        </div>
      </div>);
    }
}

Layout.propTypes = {
    children: PropTypes.node,
};
```

common.js

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/App';
import { Layout } from './components/Layout';
import '../less/index.less'; // tell webpack to request the transpiling of less to css

const root = document.getElementById('react');
ReactDOM.render(<Layout><App/></Layout>, root);
```

You may have noticed that we lost our console component. 
We had patched the global console.log which is not such a good idea. 
Let us create a Log component for React.

#### [State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

There are two types of data that control a component: props and state. props are set by the parent and they are fixed throughout the lifetime of a component. For data that is going to change, we have to use state.

In general, you should initialize state in the constructor, and then call setState when you want to change it.

Let us implement in our `Layout` component the manipulation of state:

```javascript
import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 *  Beware: React setState is asynchronous!
 *  Calling setState multiple times during a single update cycle can lead to nasty bugs, because
 *  setState is asynchronous, subsequent calls in the same update cycle will overwrite previous
 *  updates, and the previous changes will be lost.
 *
 *  This wrapper uses the alternative setState calling convention
 *  @see https://reactjs.org/docs/state-and-lifecycle.html#state-updates-may-be-asynchronous
 * @param message the message you want to add to the log console
 */
const addMessage = (message) => (previousState) => {
    // the the logs from the earlier state
    const returnState = [...previousState.logs];
    // add our message
    returnState.push(message);
    // now return our current state
    return {logs: returnState};
};


export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {logs: []};
    }
    componentDidMount() {
        const addLog = message => this.setState(addMessage(message));
        addLog('3 rendering Layout finished');
    }
    render() {
        const { logs } = this.state;
        const addLog = message => this.setState(addMessage(message));
        return (<div className="container">
            <div className="content">
                {React.cloneElement(this.props.children, { addLog })}
            </div>
            {logs && logs.length > 0 && <div id="log">
                <div>Logs:</div>
                { logs.map((item,index) => <p key={index}>{item}</p>) }
            </div>}
        </div>);
    }
}

Layout.propTypes = {
    children: PropTypes.node,
};

```

Note how we pass props to the base `constructor`:
```javascript
    constructor(props) {
        super(props);
        this.state = {logs: []};
    }
```

Class components should always call the base constructor with props.

We created a wrapper function around setState to make sure that we do not
lose any state changes. 

```javascript
const addLog = message => this.setState(addMessage(message));
```

This function we are "passing down" to our children by using `React.cloneElement` which allows to augment the properties.

```javascript
{React.cloneElement(this.props.children, { addLog })}
```

We then add the `componentDidMount` lifecycle to our `Layout` and as well to the `Hello` component.
That is because if you would try to change the state in a `render` you will get following error in the console:

```
Warning: Cannot update during an existing state transition (such as within `render` or another component's constructor). 
Render methods should be a pure function of props and state; constructor side-effects are an anti-pattern,
but can be moved to `componentWillMount`
```

The former looks like:
```javascript
    componentDidMount() {
        const addLog = message => this.setState(addMessage(message));
        addLog('3 rendering Layout finished');
    }
```

and the later looks like:

```javascript
    componentDidMount() {
        const { addLog } = this.props;
        addLog('1 rendering Hello finished');
        addLog('2 rendering Hello finished');
    }
```

The main difference is that we use `this.props.addLog` in our child component.

The result will look like:

```html
<div id="log">
    <div>Logs:</div>
    <p>1 rendering Hello finished</p>
    <p>2 rendering Hello finished</p>
    <p>3 rendering Layout finished</p>
</div>
```

You can see that first our `Hello` component finished the mount and in the end our `Layout`

#### Show logs onClick

We may not want to see all the time the log component so let us create a button which will show the log console onClick.

```javascript
{
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            showLog: false, // initially do not show console
        };
    }
    
    render() {
        const { logs, showLog } = this.state;
        const addLog = message => this.setState(addMessage(message));
        return (<div className="container">
            ...
            { !showLog && <button onClick={()=>this.setState({ showLog: true })}>Show Log</button>}
            { showLog && <div id="log">
                <div>Logs: <button onClick={()=>this.setState({ showLog: false })}>Hide Log</button></div>
                { logs.map((item,index) => <p key={index}>{item}</p>) }
            </div>}
            ...
        </div>);
    }
}

```

This examples shows that state updates are merged, since changing `this.setState({ showLog: true })`
is not changing `this.state.logs`.

#### Creating routes

As soon as you have different pages that you want to expose with your app you need to define routes 
to tell react when to render the different views. 
We will use [React Router](https://github.com/ReactTraining/react-router) in the v4 which is not 
really compatible with earlier versions of that library.

First let us activate `stage-2` support for babel, so we can use [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)
in our sources like `const objClone = { ...obj };`

Further we will install a new webpack plugin so we can load svg files and serve them.

```bash
npm i -S -E react-router-dom
npm i -D -E babel-preset-stage-2 svg-url-loader
```

We need to tell babel and webpack that we support `stage-2` now. For this we will add it to `.babelrc` in the `presets`

```json
{
  "presets": ["env", "react", "stage-2"]
}
```

Since we are starting to develop a real webapp we want to be able to serve svg images. For this we
need to add a new loader to our `webpack.config.js`. While we have opened the `webpack.config.js` 
we need to activate [history-api-fallback](https://github.com/webpack/webpack-dev-server/tree/master/examples/history-api-fallback)
in the `devServer` section to make sure all our routes are using our `index.hmtl`. Further we need to tell webpack to resolve
not only `js` extensions but as well `jsx` and modify our loader regex to include it as well in the `babel-loader`.

```
...
module.exports = {
    devServer: {
     ...
      historyApiFallback: true
    },
...
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
...
            {
                test: /\.svg$/,
                use: 'svg-url-loader'
            }
        ],
    },
...
    resolve: {
      extensions: ['.js', '.jsx']
    }
};
```

We are using this loader in our index.less

```less
.Logo {
  background-image: url('svg/React-icon.svg');
  background-repeat: no-repeat;
  width: 75px;
  height: 60px;
  margin-top: 5px;
}
.NotFound{
  background-image: url('svg/not-found.svg');
  background-repeat: no-repeat;
  background-size: 400px 175px;
  height: 200px;
  width: 100vh;
  margin: auto;
  margin-top: 25px;

}
```

Until now we had just a couple of files to provide some example of what you can do and how. Let us now create
a lot more to simulate a real world example. The following files are added

```bash
src/js/components
├── App.jsx # main component exposing Header and Main
├── Header.jsx # component to create logo and navigation tabs
├── Home.jsx # our main index page showing the usage of moment lib
├── Main.jsx # component to hold all routes and map them to components
├── NotFound.jsx # in case the route is not defined show a 404
├── Team.jsx # sample component to show nested routes and data drill down
└── teams.js # sample teams used
```

##### Header.js

```javascript
import React from 'react';
import { Link, Route } from 'react-router-dom';

export const tabs = [{
    to:'/',
    caption:'Home',
    exact: true,
}, {
    to: '/team',
    caption: 'Teams',
}];

export const TabsRender = ({ match: { url }}) => <nav><ul> 
    {tabs.map(tab => {
        let active = false;
        const { exact, to, caption} = tab;
        if (exact) {
            active = url === to;
        } else {
            active = url.indexOf(to) > -1;
        }
        return <li key={to} className={ active ? 'active' : ''}>
            <Link to={to}>{caption}</Link>
        </li>})
    }
</ul></nav>;

TabsRender.propTypes = {
    match: PropTypes.shape({ url: PropTypes.string })
};

export const Header = () => (<div className="links">
    <section className="header">
        <div className="Logo"></div>
        <Route path='*' componet={TabsRender} />
    </section>
</div>);
```

We are creating here a typical header where you have a logo on the left side and on the right hand a tap-navigation.

We are matching all path `<Route path='*' componet={TabsRender} />` and then leverage to the `TabsRender` component.
Here use the `({ match: { url }})` to 
evaluate which tab is currently active, we can use `exact` to match `url === to` or see whether our current path is based
on the team section ` url.indexOf(to) > -1`.

You may have noticed by now, that I am a big fan of newer javascript syntax. Let us see the [destruction assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
we use in the `TabRender`. Before a simple destructing example:

```javascript
const myObject = { one: 'is the loneliest number', two: 'can be as bad as one' }
const { one, two } = myObject;
console.log(one); // print: is the loneliest number
console.log(two); // print: can be as bad as one
```

This shows that we are first creating an object with two attributes `one, two`. 
Then we create 2 separate variables `one, two`. This is called destructuring, because it breaks the single object into two parts. 
Finally, the program prints the value of `one, two`.

We know from the [match](https://reacttraining.com/react-router/core/api/match) documentation that we can expect
`params, isExact, path, url` being passed to a `Route` child. We further know from the [Route](https://reacttraining.com/react-router/core/api/Route/Route-props) 
documentation that besides `match` we can expect `location` and `history` as properties passed to our `TabsRender`

```javascript
const props = { 
    location,
    history, 
    match: { 
        url, 
        path, 
        params, 
        isExact 
    }}; // this are the props that are passed from the Route
// since we are solely interested in the url to make our comparison we can "extract" the value and define a fallback
// beware of match being null then the fallback will not work, you should use undefined instead of null
const { match: { url } = { url: 'none'}} = props;
// in old shool js you need to do the following to prevent NPE
const oldSchoolUrl = props.match ? props.match.url : 'none';
// the following should be true in case match had **not** being null
url === oldSchoolUrl
```

Now have let us have a look on the `Main` compontent.

```javascript
import { Switch, Route } from 'react-router-dom';
import  { Home } from './Home';
import { Teams } from './Team';
import { NotFound} from './NotFound';

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/team' component={Teams}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
);
```

Here we are using the `Route` component slightly different then before since we now are matching different `path`.
The [Switch](https://reacttraining.com/react-router/core/api/Switch)
elemet will render the first child `<Route>` or `<Redirect>` that matches the location. Our first route uses `exact` because if
we would not use it, it will be matched on every request and hence our other matches would never be executed. 

The `<Route path='*' component={NotFound}/>` as last route will make sure we will always return at least the 404 page in case we do not
match any other path. 

The `Home` component is real basic put I want to point to the default import of `App2` `import App2 from './App2';` because it shows the usages of HOC.

##### HOC [higher order components](https://reactjs.org/docs/higher-order-components.html)

In our first version before using the router we used the `Layout` component to pass the `addMessage` method to the children. However 
we do not need our Layout component anymore but we need that method. The solution is to create a HOC. 

> A higher-order component (HOC) is an advanced technique in React for reusing component logic. HOCs are not part of the React API, per se. They are a pattern that emerges from React’s compositional nature.
> <cite>[higher order components](https://reactjs.org/docs/higher-order-components.html)</cite>

Our HOC component looks like:

```javascript
import React, {Component} from 'react';

const addMessageAction = (message) => (previousState) => {
    // the the logs from the earlier state
    const returnState = [...previousState.logs];
    // add our message
    returnState.push(message);
    // now return our current state
    return {logs: returnState};
};

export const addMessage = ComposedComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            showLog: false,
        };
    }
    componentDidMount() {
        const addLog = message => this.setState(addMessageAction(message));
        addLog('HOC component did mount');
    }
    render() {
        const { logs, showLog } = this.state;
        const addLog = message => this.setState(addMessageAction(message));
        const messageOutput = showLog ? (<div id="log">
            <div>Logs: <button onClick={()=>this.setState({ showLog: false })}>Hide Log</button></div>
            { logs.map((item,index) => <p key={index}>{item}</p>) }
        </div>) : (<button onClick={()=>this.setState({ showLog: true })}>Show Log</button>);
        return (<ComposedComponent
            addLog={addLog}
            messageOutput={messageOutput}
            {...this.props}
        />);
    }
};
```

What we are doing here is basically augment the component that is passed to us with two new properties `addMessage` as a function
and `messageOutput` as DOM element.

We are using it in our `App2` as follows and define the `ComposedComponent` as `export default`: 

```javascript
...
import { addMessage} from './addMessage';
...
export default addMessage(App2);
// leads to:
export const addMessage = App2 => class extends Component {
    ...
    return (<App2
        addLog={addLog}
        messageOutput={messageOutput}
        {...this.props}
    />);
}
```

##### nested routes

In `Team.jsx` we are using nested routes to create an overview page and the team detail page.
In the Main component we have declared to match the Teams, so we only
enter when the `url` starts with `/team`. The following can lead to an error
which will stop our app from rendering.

```javascript
...
export const Teams = () => <div className="TeamContainer">
    <Switch>
      <Route exact path='/team' component={ TeamsRender }/>
      <Route path='/team/:name' component={ Members } />
    </Switch>
</div>;
```

In the case that the team name does not exist we will run into a NPE becasue of
the fact that `getTeams(name)[0]` return null.

```javascript
export const Members = ({ match: { params: { name }}}) => {
    const { displayName, image, members } = getTeams(name)[0];
    return (<div className="team">
        <div className="spacer">
            <img className="animate" src={image} alt={displayName} title={displayName}/>
        </div>
        { members.map(item => <Member {...{...item, key: item.character}} />)}
    </div>);
};
```

##### [Error Boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)

First of all let us use a new feature of react 16 where we can
use [error boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)
to prevent our app from breaking.

> Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.
> <cite>[error boundaries](https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html)</cite>

We want to be able to catch the error that can happen in different places
for our application. This calls to create another HOC, which shows us that we can 
return an error answer instead of the component that has errors.

```javascript
import React, {Component} from 'react';

export const Alert = ({error: { message}, info: {componentStack}}) => {
    const stack = componentStack.split(/\n/)
        .filter(content => content !== '')
        .map(item => <li>{item}</li>);
    return (<div className="Alert">
        <div className="Alert-Flex">
            <div className="border">&nbsp;</div>
            <div className="title">
                { message }
            </div>
        </div>
        <div className="Alert-Flex">
            <div className="border">&nbsp;</div>
            <div className="message">
                <ul>
                    { stack }
                </ul>
            </div>
        </div>
    </div>);
};
export const addErrorBounds = ComposedComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            message: undefined,
        };
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true, message: {error, info}});
    }
    render() {
        // if we have errors we return an alert and not the ComposedComponent
        if (this.state.hasError) {
            const { error, info } = this.state.message;
            return <Alert {...{error, info}}/>;
        }
        return (<ComposedComponent {...this.props} />);
    }
};
```

Now we can add it to our parent `App` component as a `catch all error anywhere` 
approach with `export default addErrorBounds(App);` and use the default import for our common.js.

However that will basically make our app unusable since we do not render any child.

When we use it on a component level like follows, we can prevent only the problematic component to be rendered
but the rest of our app will work as expected.
```javascript
// showing how you can use HOC to reuse error boundaries
export const BoundedMembers = addErrorBounds(Members);
export const Teams = () => <div className="TeamContainer">
    <Switch>
      <Route exact path='/team' component={ TeamsRender }/>
      <Route path='/team/:name' component={ BoundedMembers } />
    </Switch>
</div>;
```

In case that we want to look up a team that triggers a NPE we will now display 
an alert instead to break our app, which still provides means to go to the registered
views. In real life you would now go ahead and prevent that non-existing teams can be returned,  however 
for demonstration purposes of the error boundaries we will not do that.

