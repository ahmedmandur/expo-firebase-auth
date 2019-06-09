import React from "react";
import { View, Button, Text } from "react-native";
import firebase from "firebase";
import Spinner from "../components/Ui/Spinner";
export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome to the app!"
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "90%", marginBottom: 10 }}>
          <Button title="Actually, sign me out :)" onPress={this._signOut} />
        </View>
      </View>
    );
  }

  _signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        this.props.navigation.navigate("Auth");
      })
      .catch(function(error) {
        console.log(error);
      });
  };
}
