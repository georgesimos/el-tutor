import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { AdminLayout, PublicLayout } from './layouts';

// Admin
const Account = lazy(() => import('./pages/Admin/Account'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register/Register'));
const Login = lazy(() => import('./pages/Public/Login/Login'));

// Public

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* <ProtectedRoute exact path="/admin/account" layout={AdminLayout} component={Account} /> */}
          <WithLayoutRoute exact path="/admin/account" layout={AdminLayout} component={Account} />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
