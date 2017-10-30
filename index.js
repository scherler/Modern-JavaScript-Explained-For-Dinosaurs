// index.js
import moment from 'moment';
import './index.less'; // tell webpack to request the transpiling of less to css
console.log('Hello from JavaScript and weback server!');
console.log(`startOf("day").fromNow(): ${moment().startOf('day').fromNow()}`);