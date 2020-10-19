import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import InputModal from "./InputModal";

const UserInput = ({region, choosePin, setChoosePin}) => {
  const [location, setLocation] = useState(null);
  const [uploading, setUpoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [progress, setProgress] = useState(null);
 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("user is dumb");
      }
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      setLocation(location);
    })();
  }, []);

  const userChooseLocation = (region) => {
    var lat = region.latitude;
    var lon = region.longitude;
    var loc = {
      "coords": {
        "latitude" : lat,
        "longitude" : lon,
      }
    }
    setLocation(loc)
  };

  const meowmeow = (region) => {
    console.log(region)
  }

  return (
    <View style={styles.bottomMenu}>
      {formVisible ? (
        <InputModal
          formVisible={formVisible}
          setFormVisible={setFormVisible}
          location={location}
          progress={progress}
          region = {region}
          choosePin = {choosePin}
          setChoosePin = {setChoosePin}
        />
      ) : null}
      { !choosePin ?
      (<TouchableOpacity
        onPress={() => setFormVisible(true) && setProgress("editing")}
        style={{ flex: 1, alignItems: "center" }}
      >
      <Ionicons
        name="ios-add"
        size={45}
        color="black"
        title="Open image form"
      />
      <Text>Add a Spot</Text>
      </TouchableOpacity>):null
      }
      { choosePin ?
        (<TouchableOpacity
          onPress={() => { setChoosePin(false); setFormVisible(true); userChooseLocation(region); meowmeow(region)}}
          style={{ flex: 1, alignItems: "center" }}
        >
        <Ionicons
          name="ios-add"
          size={45}
          color="green"
          title="Open image form"
        />
        <Text>Set Pin Location</Text>
        </TouchableOpacity>):null
        }
    </View>
  );
};

styles = StyleSheet.create({
  bottomMenu: {
    flex: 1,
    alignItems: "center",
  },
});

export default UserInput;
