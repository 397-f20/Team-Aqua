import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import InputModal from "./InputModal";
import SignInModal from "./SignInModal";
import UserContext from "../UserContext";

const UserInput = ({ region, choosePin, setChoosePin }) => {
  const [location, setLocation] = useState(null);
  const [formVisible, setFormVisible] = useState(false);
  const [signInVisible, setSignInVisible] = useState(false);
  const currentUser = useContext(UserContext);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("user is dumb");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const userChooseLocation = (region) => {
    var lat = region.latitude;
    var lon = region.longitude;
    var loc = {
      coords: {
        latitude: lat,
        longitude: lon,
      },
    };
    setLocation(loc);
  };

  return (
    <View>
      {formVisible ? (
        <InputModal
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          location={location}
          choosePin={choosePin}
          setChoosePin={setChoosePin}
        />
      ) : null}
      {signInVisible ? (
        <SignInModal
          signInVisible={signInVisible}
          setSignInVisible={setSignInVisible}
        />
      ) : null}
      <View style={styles.bottomMenu}>
        {!choosePin ? (
          <React.Fragment>
            {currentUser ? (
              <TouchableOpacity
                onPress={() => setFormVisible(true)}
                style={{ flex: 1, alignItems: "center" }}
              >
                <Ionicons name="ios-add" size={45} color="green" />
                <Text style={{ color: "green" }}>Add a Spot</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => setSignInVisible(true)}
                style={{ flex: 1, alignItems: "center" }}
              >
                <Ionicons name="ios-add" size={45} color="gray" />
                <Text style={{ color: "gray" }}>Sign In to Add a Spot</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setSignInVisible(true)}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Ionicons name="ios-person" size={45} color="green" />
              {currentUser ? (
                <Text style={{ color: "green" }}>Log Out</Text>
              ) : (
                <Text testID="signInButton" style={{ color: "green" }}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <TouchableOpacity
              testID="close"
              onPress={() => {
                setChoosePin(false);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Ionicons name="ios-close" size={45} color="black" />
              <Text style={{ color: "black" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setChoosePin(false);
                userChooseLocation(region);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Ionicons name="ios-checkmark" size={45} color="green" />
              <Text style={{ color: "green" }}>Confirm Location</Text>
            </TouchableOpacity>
          </React.Fragment>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default UserInput;
