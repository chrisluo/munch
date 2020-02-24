import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error occured!", error, [
        {
          text: "Okay"
        }
      ]);
    }
  }, [error]);

  const loginHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.login(email, password));
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.screen} behavior="height">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient
          style={styles.gradient}
          colors={[Colors.primary.light, Colors.secondary.light]}
        >
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Text style={styles.logoText}>Munch</Text>
            </View>
            <View style={styles.authContainer}>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#000"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={text => setEmail(text)}
                />
              </View>
              <View style={styles.formControl}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#000"
                  secureTextEntry
                  onChangeText={text => setPassword(text)}
                />
              </View>

              <View style={styles.buttonContainer}>
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.primary.main} />
                ) : (
                  <Button
                    title="Login"
                    color={Colors.primary.main}
                    onPress={loginHandler}
                  />
                )}
              </View>
            </View>
          </View>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerShown: false
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  contentContainer: {
    width: "100%",
    height: "80%",
    justifyContent: "flex-start",
    alignItems: "center"
  },
  logoContainer: {
    height: 100,
    width: 200,
    borderRadius: 20,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: Colors.primary.main,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 64
  },
  logoText: {
    fontSize: 42,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: Colors.primary.dark,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 0,
      height: 4
    }
  },
  authContainer: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 16
  },
  formControl: { width: "100%", marginVertical: 16 },
  input: {
    borderBottomWidth: 1,
    paddingHorizontal: 2,
    paddingVertical: 8
  },
  buttonContainer: {
    marginTop: 2
  }
});

export default AuthScreen;
