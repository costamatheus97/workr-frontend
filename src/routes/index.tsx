import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import UserSignUp from '../pages/Users/UserSignUp';
import UserSignIn from '../pages/Users/UserSignIn';
import CompanySignUp from '../pages/Companies/CompanySignUp';
import CompanySignIn from '../pages/Companies/CompanySignIn';
import Dashboard from '../pages/Companies/Dashboard';
import SignIn from '../pages/General/SignIn';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" exact component={SignIn} />
    <Route path="/signup/users" component={UserSignUp} />
    <Route path="/signin/users" component={UserSignIn} />
    <Route path="/signup/companies" component={CompanySignUp} />
    <Route path="/signin/companies" component={CompanySignIn} />
    <Route path="/dashboard" component={Dashboard} isPrivate />
  </Switch>
);

export default Routes;
