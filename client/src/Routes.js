import React, { lazy, Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';
import { history } from './utils';

// Admin
const Account = lazy(() => import('./pages/Admin/Account/Account'));
const User = lazy(() => import('./pages/Admin/User/User'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register/Register'));
const Login = lazy(() => import('./pages/Public/Login/Login'));

// Public
const Home = lazy(() => import('./pages/Public/HomePage/HomePage'));

const Routes = () => (
  <Suspense fallback={<Loading />}>
    <Router history={history}>
      <Switch>
        <WithLayoutRoute exact path="/" layout={PublicLayout} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <ProtectedRoute exact path="/admin/account" layout={AdminLayout} component={Account} />
        <ProtectedRoute exact path="/admin/users" layout={AdminLayout} component={User} />
        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </Router>
  </Suspense>
);

export default Routes;
