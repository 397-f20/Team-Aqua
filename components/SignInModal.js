import React, { useState, useContext } from "react";
import Form from "./Form";
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
  View,
  Button,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { firebase } from "../firebase";
import * as Yup from "yup";
import UserContext from "../UserContext";

const validationSchema = Yup.object().shape({
  username: Yup.string().label("username"),
  email: Yup.string()
    .required("Please enter a valid email")
    .email()
    .label("Email"),
  password: Yup.string()
    .required()
    .min(6, "Password must have at least 6 characters")
    .label("Password"),
  confirm: Yup.string()
    .nullable()
    .oneOf(
      [Yup.ref("password"), ""],
      "Confirmation password must match password"
    ),
});

const SignInModal = ({ signInVisible, setSignInVisible }) => {
  const [signInError, setSignInError] = useState("");
  const [signIn, setSignIn] = useState(true); //true= log in; false= sign up
  const currentUser = useContext(UserContext);

  const handleOnSubmit = (values) => {
    if (values.confirm) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((firebaseUser) => {
          setSignInVisible(false);
          return firebaseUser.user
            .updateProfile({
              displayName: `${values.username}`,
            })
            .then((profile) => {
              firebase
                .database()
                .ref("users")
                .child(firebaseUser.user.uid)
                .set({
                  username: values.username,
                  uid: firebaseUser.user.uid,
                });
            });
        })
        .catch(function (error) {
          if (error.code === "auth/email-already-in-use") {
            setSignInError("Account already exists.");
          } else {
            setSignInError(error.message);
          }
        });
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then(function (firebaseUser) {
          setSignInVisible(false);
        })
        .catch(function (error) {
          if (error.code === "auth/user-not-found") {
            setSignInError("Account not found. Confirm password to sign up.");
          } else if (error.code === "auth/wrong-password") {
            setSignInError("Wrong password.");
          } else {
            setSignInError(error.message);
          }
        });
    }
  };

  return (
    <SafeAreaView style = {styles.webview}>
      <Modal isVisible={signInVisible} avoidKeyboard={true}>
        <TouchableOpacity
          testID="close"
          onPress={() => setSignInVisible(false)}
        >
          <Ionicons name="ios-close" size={45} color="white" />
        </TouchableOpacity>
        {currentUser ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              firebase.auth().signOut();
            }}
          >
            <Text style={{ color: "white" }}>Log Out</Text>
          </TouchableOpacity>
        ) :
          signIn ? (
            <View>
              <Form
                initialValues={{
                  username: "",
                  email: "",
                  password: "",
                  confirm: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleOnSubmit}
              >
                <Form.Field
                  name="email"
                  leftIcon="email"
                  placeholder="Enter Email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                />
                <Form.Field
                  name="password"
                  leftIcon="lock"
                  placeholder="Enter Password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={true}
                  textContentType="password"
                />
                <Form.Button
                  color="green"
                  title="Sign In"
                />
                <Button
                  onPress={() => setSignIn(false)}
                  color="green"
                  title="Or, Create an Account"
                />
                {<Form.ErrorMessage error={signInError} visible={true} />}
              </Form>
            </View>
          ) : (
             <View>
               <Form
                 initialValues={{
                   username: "",
                   email: "",
                   password: "",
                   confirm: "",
                 }}
                 validationSchema={validationSchema}
                 onSubmit={handleOnSubmit}
               >
                 <Form.Field
                   name="username"
                   leftIcon="account"
                   placeholder="Enter User Name"
                   autoCapitalize="none"
                   textContentType="username"
                 />
                 <Form.Field
                   name="email"
                   leftIcon="email"
                   placeholder="Enter Email"
                   autoCapitalize="none"
                   keyboardType="email-address"
                   textContentType="emailAddress"
                 />
                 <Form.Field
                   name="password"
                   leftIcon="lock"
                   placeholder="Enter Password"
                   autoCapitalize="none"
                   autoCorrect={false}
                   secureTextEntry={true}
                   textContentType="password"
                 />
                 <Form.Field
                   name="confirm"
                   leftIcon="lock"
                   placeholder="Confirm Password"
                   autoCapitalize="none"
                   autoCorrect={false}
                   secureTextEntry={true}
                   textContentType="password"
                 />
                 <Form.Button
                   color="green"
                   title="Sign Up"
                 />
                 <Button
                   onPress={() => setSignIn(true)}
                   color="green"
                   title="Or, Log In"
                 />
                 {<Form.ErrorMessage error={signInError} visible={true} />}
               </Form>
             </View>
           )
        }
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
  },
  webview: {
    position: "absolute",
    top: Dimensions.get("window").width * -0.4
  }
});

export default SignInModal;
