import React, { useState, useCallback } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import UserPlaces from './places/pages/UserPlaces';
import { AuthContext } from './shared/context/auth-context';
import Auth from './user/pages/Auth';

function App() {

  const [ isLoggedIn, setIsLoggedIn ] = useState(false);
  const [ userId, setUserId ] = useState(null);

  const login = useCallback((uId)=>{
    setIsLoggedIn(true);
    setUserId(uId);
  }, []);

  const logout = useCallback(()=>{
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;

  if(isLoggedIn){
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/places/new" exact>
          <NewPlace/>
        </Route>
        <Route path="/places/:placeId" >
          <UpdatePlace/>
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users/>
        </Route>
        <Route path="/:userId/places" exact>
          <UserPlaces/>
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userId }}>
      <BrowserRouter>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
