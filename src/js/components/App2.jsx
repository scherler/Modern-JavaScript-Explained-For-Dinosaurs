import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hello, Hello2 } from './Hello';
import { addMessage} from './addMessage';

export class App2 extends Component {
    componentDidMount() {
        const { addLog =(message) => console.log(message) } = this.props;
        addLog('rendering APP2 finished');
    }
    render() {
        const { messageOutput = (<div>Nothing</div>) } = this.props;
        return <div>Second page <Hello {...this.props} /><Hello2 {...this.props} /> {  messageOutput}</div>;
    }
}

App2.propTypes = {
    addLog: PropTypes.func,
    messageOutput: PropTypes.node,
};

export default addMessage(App2);