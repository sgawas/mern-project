import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';

function App() {
  return (
  <BrowserRouter>
    <MainNavigation />
    <main>
    <Switch>
      <Route path="/" exact>
        <Users/>
      </Route>
      <Route path="/places/new" exact>
        <NewPlace/>
      </Route>
      <Route path="/places/:placeId" >
        <UpdatePlace/>
      </Route>
      <Route path="/:userId/places" exact>
        <UserPlaces/>
      </Route>
      <Redirect to="/" />
    </Switch>
    </main>
  </BrowserRouter>
  );
}

export default App;
