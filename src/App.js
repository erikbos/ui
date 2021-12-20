import * as React from "react";
import { Admin, Resource } from "react-admin";

import apiProvider from './dataProvider.ts';

import Dashboard from './Dashboard';
import { ListenerList, ListenerEdit, ListenerCreate } from './Listeners';
import { RouteEdit, RouteList, RouteCreate } from './Routes';
import { ClusterList, ClusterEdit, ClusterCreate } from './Clusters';
import { UserList, UserEdit, UserCreate } from './Users';
import { RoleList, RoleEdit, RoleCreate } from './Roles';

const dataProvider = apiProvider('http://127.0.0.1:7777');

const App = () => (
  <Admin
    title="Gatekeeper Admin"
    dataProvider={dataProvider}
    disableTelemetry
    dashboard={Dashboard} >
    <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} />
    <Resource name="roles" list={RoleList} edit={RoleEdit} create={RoleCreate} />
    <Resource name="listeners" list={ListenerList} edit={ListenerEdit} create={ListenerCreate} />
    <Resource name="routes" list={RouteList} edit={RouteEdit} create={RouteCreate} />
    <Resource name="clusters" list={ClusterList} edit={ClusterEdit} create={ClusterCreate} />
  </Admin>
);

export default App;
