import { Switch, Route } from 'react-router-dom';
import  { Home } from './Home';
import { Teams } from './Team';
import { NotFound} from './NotFound';

export const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/team' component={Teams}/>
      <Route path='*' component={NotFound}/>
    </Switch>
  </main>
);