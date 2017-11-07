import React, {Component} from 'react';
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
