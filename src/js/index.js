// index.js
import moment from 'moment';
export const sum = (a, b) => a + b;
console.log('Hello from JavaScript and weback server!');
console.log(`startOf("day").fromNow(): ${moment().startOf('day').fromNow()}`);
console.log(`1 + 1 is ${sum(1, 1)}`);
