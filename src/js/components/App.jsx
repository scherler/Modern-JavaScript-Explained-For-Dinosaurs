import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hello, Hello2 } from './Hello';

export class App extends Component {
    render() {
        const { props } = this;
        return [ <Hello {...props} key="1"/>, <Hello2 {...props} key="2"/>]
    }
}

App.propTypes = {
    children: PropTypes.node,
};
