import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

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
const addMessage = (message) => (previousState) => {
    // the the logs from the earlier state
    const returnState = [...previousState.logs];
    // add our message
    returnState.push(message);
    // now return our current state
    return {logs: returnState};
};


export class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logs: [],
            showLog: false,
        };
    }
    componentDidMount() {
        const addLog = message => this.setState(addMessage(message));
        addLog('3 rendering Layout finished');
    }
    render() {
        const { logs, showLog } = this.state;
        const addLog = message => this.setState(addMessage(message));
        return (<div className="container">
            <div className="links">
                <section>
                    <nav>
                        <ul>
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/x">App2</Link></li>
                        </ul>
                    </nav>
                </section>
            </div>
            <div className="content">
                {React.cloneElement(this.props.children, { addLog })}
            </div>
            { !showLog && <button onClick={()=>this.setState({ showLog: true })}>Show Log</button>}
            { showLog && <div id="log">
                <div>Logs: <button onClick={()=>this.setState({ showLog: false })}>Hide Log</button></div>
                { logs.map((item,index) => <p key={index}>{item}</p>) }
            </div>}
        </div>);
    }
}

Layout.propTypes = {
    children: PropTypes.node,
};
