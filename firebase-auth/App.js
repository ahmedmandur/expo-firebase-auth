import React from "react";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LoginPage from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import { firebaseConfig } from "./config/fbConfig";
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

const AppStack = createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen
});

const AuthStack = createStackNavigator(
  { Login: LoginPage },
  { headerMode: "none" }
);

const AppContaner = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

export default class App extends React.Component {
  componentWillMount() {
    firebaseConfig();
  }

  render() {
    return <AppContaner />;
  }
}
