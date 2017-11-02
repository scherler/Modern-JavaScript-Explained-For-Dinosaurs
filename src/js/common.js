import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { App } from './components/App';
import { App2 } from './components/App2';
import { Layout } from './components/Layout';
import '../less/index.less'; // tell webpack to request the transpiling of less to css

const root = document.getElementById('react');
ReactDOM.render(<Router>
  <div>
    <Route exact path="/" render={() => <Layout><App/></Layout>}/>
    <Route path="/x" render={() => <Layout><App2/></Layout>}/>
  </div>
</Router>, root);
