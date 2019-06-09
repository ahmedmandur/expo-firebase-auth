import React from "react";
import firebase from "firebase";
import AuthLoadingScreen from "./screens/AuthLoadingScreen";
import LoginPage from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";

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
    firebase.initializeApp({
      apiKey: "AIzaSyAp_mjww6YZidSbfgS2d0IsXHFE0cek1ts",
      authDomain: "projectplanner-6391b.firebaseapp.com",
      databaseURL: "https://projectplanner-6391b.firebaseio.com",
      projectId: "projectplanner-6391b",
      storageBucket: "projectplanner-6391b.appspot.com",
      messagingSenderId: "107557021977",
      appId: "1:107557021977:web:3b61d406f66f4efa"
    });
  }

  render() {
    return <AppContaner />;
  }
}
