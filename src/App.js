import * as React from "react";
import { Admin, Resource } from "react-admin";

import apiProvider from './dataProvider.ts';

import Dashboard from "./views/Dashboard/Dashboard.js";
import Listeners from "./views/Listeners";
import Routes from "./views/Routes";
import Clusters from "./views/Clusters";
import Users from "./views/Users";
import Roles from './views/Roles';

const dataProvider = apiProvider(process.env.REACT_APP_API_URL);

const App = () => {
  return (
  <Admin
    title="Gatekeeper Admin"
    dataProvider={dataProvider}
    disableTelemetry
    dashboard={Dashboard} >
    <Resource name="users" list={Users.List} edit={Users.Edit} create={Users.Create} />
    <Resource name="roles" list={Roles.List} edit={Roles.Edit} create={Roles.Create} />
    <Resource name="listeners" list={Listeners.List} edit={Listeners.Edit} create={Listeners.Create} />
    <Resource name="routes" list={Routes.List} edit={Routes.Edit} create={Routes.Create} />
    <Resource name="clusters" list={Clusters.List} edit={Clusters.Edit} create={Clusters.Create} />
  </Admin>
)
};

export default App;
