import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';

export const tabs = [{
    to:'/',
    caption:'Home',
    exact: true,
}, {
    to: '/team',
    caption: 'Teams',
}];

export const TabsRender = ({ match: { url } = { url: 'none'}}) => <nav><ul>
    {tabs.map(tab => {
        let active = false;
        const { exact, to, caption} = tab;
        if (exact) {
            active = url === to;
        } else {
            active = url.indexOf(to) > -1;
        }
        return <li key={to} className={ active ? 'active' : ''}>
            <Link to={to}>{caption}</Link>
        </li>})
    }
</ul></nav>;

TabsRender.propTypes = {
    match: PropTypes.shape({ url: PropTypes.string })
};

export const Header = () => (<div className="links">
    <section className="header">
        <div className="Logo"></div>
        <Route path='*' component={TabsRender} />
    </section>
</div>);