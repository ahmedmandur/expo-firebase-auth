import React from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Image,
  TextInput,
  Button,
  Text
} from "react-native";
import firebase from "firebase";
import Spinner from "../components/Ui/Spinner";
import * as Facebook from "expo-facebook";

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      success: "",
      loading: false
    };
  }

  _onPressLogin = () => {
    this.setState({ error: "", loading: true });
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        this.setState({
          error: "",
          success: "Authentication success!",
          loading: false
        });
        this.props.navigation.navigate("App");
      })
      .catch(e => {
        this.setState({
          error: "Authentication failed.",
          success: "",
          loading: false
        });
      });
  };

  _onPressLoginFb = async () => {
    this.setState({ error: "", loading: true });
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions
    } = await Facebook.logInWithReadPermissionsAsync("2308145589222541", {
      permissions: ["public_profile"]
    });
    if (type === "success") {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`
      );
      Alert.alert("Logged in!", `Hi ${(await response.json()).name}!`);
    } else {
      // type === 'cancel'
    }
  };

  _onPressCancel = () => {
    this.setState({ email: "" });
    this.setState({ password: "" });
    this.setState({ error: "", success: "", loading: false });
  };

  renderButtonOrSpinner() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return <Button onPress={this._onPressLogin.bind(this)} title="Log in" />;
  }

  renderButtonOrSpinnerFb() {
    if (this.state.loading) {
      return <Spinner />;
    }
    return (
      <Button
        onPress={this._onPressLoginFb.bind(this)}
        title="Log in with Facebook"
      />
    );
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <Image source={require("../assets/icon.png")} style={styles.image} />
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <Text style={styles.successTextStyle}>{this.state.success}</Text>
        <TextInput
          value={this.state.email}
          onChangeText={inputan => this.setState({ email: inputan })}
          style={styles.email}
          placeholder="email..."
        />
        <TextInput
          value={this.state.password}
          onChangeText={inputan => this.setState({ password: inputan })}
          style={styles.email}
          placeholder="Password,,,"
          secureTextEntry={true}
        />
        <View style={styles.button}>{this.renderButtonOrSpinner()}</View>
        <View style={styles.button}>{this.renderButtonOrSpinnerFb()}</View>
        <View style={styles.button}>
          <Button onPress={this._onPressCancel} title="Cancel" />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "skyblue"
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 40
  },
  email: {
    backgroundColor: "white",
    borderRadius: 5,
    width: "90%",
    padding: 5,
    marginBottom: 10
  },
  button: {
    width: "90%",
    marginBottom: 10
  },
  errorTextStyle: {
    color: "#E64A19",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  },
  successTextStyle: {
    color: "#33691e",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold"
  }
});
