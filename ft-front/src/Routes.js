import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Home from './core_components/Home';
import TrackerMain from './tracker_page/TrackerMain';
import PrivateRoute from './auth/PrivateRoute';
import UDashboard from './udashboard/UDashboard';
import ADashboard from './admin/ADashboard';
import AdminRoutes from './auth/AdminRoutes';
import TrackerCategory from './tracker_page/TrackerCategory';
import TransactionsPage from './tracker_page/TransactionsPage';
import ChartsPage from './tracker_page/ChartsPage';
const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home}/>
        <PrivateRoute path="/tracker" exact component={TrackerMain}/>
        <PrivateRoute path="/category" exact component={TrackerCategory}/>
        <PrivateRoute path="/udashboard" exact component={UDashboard}/>
        <PrivateRoute path="/transactions" exact component={TransactionsPage}/>
        <PrivateRoute path="/chart" exact component={ChartsPage}/>
        <AdminRoutes path="/admin/dashboard" exact component={ADashboard}/>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;