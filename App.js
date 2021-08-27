import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import {createSwitchNavigator, createAppContainer} from 'react-navigation'

import Login from './screens/login';
import Loading from './screens/loading';
import Dashboard from './screens/dashBorad';


const switchNavigator = createSwitchNavigator({
  Loading: Loading,
  Login: Login,
  Dashboard: Dashboard,
})

const AppNavigator = createAppContainer(switchNavigator)

export default function App() {
  return <AppNavigator/>
}
