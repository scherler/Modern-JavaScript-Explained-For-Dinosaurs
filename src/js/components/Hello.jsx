import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Hello extends Component {
    componentDidMount() {
        const { addLog =(message) => console.log(message) } = this.props;
        addLog('1 rendering Hello finished');
        addLog('2 rendering Hello finished');
    }
    render() {
        const { from } = this.props;
        return (<div>Hello React from {from}!</div>);
    }
}

export const Hello2 = ({from = 'Hello2', children}) => (<div>
    Hello React from {from}!
    { children && <p>{children}</p>}
</div>);

Hello.propTypes = {
    from: PropTypes.string,
    children: PropTypes.node,
    addLog: PropTypes.func,
};

Hello.defaultProps = {
    from: 'Hello.jsx'
};

Hello2.propTypes = Hello.propTypes;
