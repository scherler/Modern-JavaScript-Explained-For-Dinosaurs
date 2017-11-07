import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {teams, getTeams} from './teams';
import { addErrorBounds } from './Alert';

export const Team = ({displayName, name, image}) => (<div className="team">
    <Link to={`/team/${name}`}>
        <img src={image} alt={displayName} title={displayName}/>
    </Link>
</div>);
Team.propTypes = {
    match: PropTypes.shape({
        displayName: PropTypes.string,
        name: PropTypes.string,
        image: PropTypes.string,
    })
};
export const TeamsRender = () => (<div className="teams">
    { teams.map(item => <Team {...{...item, key: item.name}}/>) }
</div> );
export const Member = (member) => {
    const { actor, character } = member;
    return (<div className="member">
        <div className="character">
            {character}
        </div>
        <div className="actor">
            {actor}
        </div>
    </div>);
};
Member.propTypes = {
    member: PropTypes.shape({
        actor: PropTypes.string,
        character: PropTypes.string,
    })
};
export const Members = ({ match: { params: { name }}}) => {
    const { displayName, image, members } = getTeams(name)[0];
    return (<div className="team">
        <div className="spacer">
            <img className="animate" src={image} alt={displayName} title={displayName}/>
        </div>
        { members.map(item => <Member {...{...item, key: item.character}} />)}
    </div>);
};
Members.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            name: PropTypes.string,
        }),
    }),
};
// showing how you can use HOC to reuse error boundaries
export const BoundedMembers = addErrorBounds(Members);
export const Teams = () => <div className="TeamContainer">
    <Switch>
      <Route exact path='/team' component={ TeamsRender }/>
      <Route path='/team/:name' component={ BoundedMembers } />
    </Switch>
</div>;
