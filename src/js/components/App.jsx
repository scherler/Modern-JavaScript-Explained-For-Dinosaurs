import React from 'react';
import { Header } from './Header';
import { Main } from './Main';
import { addErrorBounds } from './Alert';

export const App = () => (<div className="container">
    <Header/>
    <Main/>
</div>);

export default addErrorBounds(App);