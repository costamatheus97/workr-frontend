import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/General/SignIn';

import UserSignUp from '../pages/Users/UserSignUp';
import UserSignIn from '../pages/Users/UserSignIn';
import UserDashboard from '../pages/Users/Dashboard';
import UserProfile from '../pages/Users/UpdateProfile';

import CompanySignUp from '../pages/Companies/CompanySignUp';
import CompanySignIn from '../pages/Companies/CompanySignIn';
import CompanyDashboard from '../pages/Companies/Dashboard';
import CompanyProfile from '../pages/Companies/UpdateProfile';
import CompanyPublishJobs from '../pages/Companies/Jobs';
import CompanyJobList from '../pages/Companies/JobList';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/signin" exact component={SignIn} />

    <Route path="/signup/users" component={UserSignUp} />
    <Route path="/signin/users" component={UserSignIn} />

    <Route path="/signup/companies" component={CompanySignUp} />
    <Route path="/signin/companies" component={CompanySignIn} />

    <Route
      path="/users/dashboard"
      component={UserDashboard}
      isPrivate="users"
    />
    <Route path="/users/profile" component={UserProfile} isPrivate="users" />

    <Route
      path="/companies/dashboard"
      component={CompanyDashboard}
      isPrivate="companies"
    />
    <Route
      path="/companies/profile"
      component={CompanyProfile}
      isPrivate="companies"
    />
    <Route
      path="/companies/jobs/list"
      component={CompanyJobList}
      isPrivate="companies"
    />
    <Route
      path="/companies/jobs/publish"
      component={CompanyPublishJobs}
      isPrivate="companies"
    />
  </Switch>
);

export default Routes;
