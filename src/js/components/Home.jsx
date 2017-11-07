import React from 'react';
import moment from 'moment';
import App2 from './App2';

export const Home = () => (<div>
    <h2>Home</h2>
    <div className="teams">
        <span>Time is: </span>
        <span>{ moment().format('dddd, MMMM Do YYYY, h:mm:ss a') }</span>
    </div>
    <div className="teams">
        <span>Is Daylight Saving Time: </span>
        <span>{ moment().isDST() ? 'yes' : 'no' }</span>
    </div>
    <div>
        <h2>Former example</h2>
        <div><App2/></div>
    </div>
</div>);