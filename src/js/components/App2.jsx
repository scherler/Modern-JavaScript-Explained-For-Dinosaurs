import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class App2 extends Component {
    componentDidMount() {
        const { addLog =(message) => console.log(message) } = this.props;
        addLog('rendering APP2 finished');
    }
    render() {
        return <div>Second page</div>;
    }
}

App2.propTypes = {
    addLog: PropTypes.func,
};