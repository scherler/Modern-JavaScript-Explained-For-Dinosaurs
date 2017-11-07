import React, {Component} from 'react';

export const Alert = ({error: { message}, info: {componentStack}}) => {
    const stack = componentStack.split(/\n/)
        .filter(content => content !== '')
        .map(item => <li>{item}</li>);
    return (<div className="Alert">
        <div className="Alert-Flex">
            <div className="border">&nbsp;</div>
            <div className="title">
                { message }
            </div>
        </div>
        <div className="Alert-Flex">
            <div className="border">&nbsp;</div>
            <div className="message">
                <ul>
                    { stack }
                </ul>
            </div>
        </div>
    </div>);
};
export const addErrorBounds = ComposedComponent => class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            message: undefined,
        };
    }
    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({hasError: true, message: {error, info}});
    }
    render() {
        // if we have errors we return an alert and not the ComposedComponent
        if (this.state.hasError) {
            const { error, info } = this.state.message;
            return <Alert {...{error, info}}/>;
        }
        return (<ComposedComponent {...this.props} />);
    }
};