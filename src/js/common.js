import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App';
import '../less/index.less'; // tell webpack to request the transpiling of less to css

const root = document.getElementById('react');
ReactDOM.render(<Router><App/></Router>, root);
