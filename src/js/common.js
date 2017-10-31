import '../less/index.less'; // tell webpack to request the transpiling of less to css
import React from 'react';
import ReactDOM from 'react-dom';

const root = document.getElementById('react');
ReactDOM.render(<div>Hello React!</div>, root);
