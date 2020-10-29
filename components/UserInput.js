import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import InputModal from "./InputModal";

const UserInput = ({region, choosePin, setChoosePin}) => {
  const [location, setLocation] = useState(null);
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
    <View>
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
      <View style={styles.bottomMenu}>
        {!choosePin ?
        (
        <TouchableOpacity
          onPress={() => setFormVisible(true) && setProgress("editing")}
          style={{ flex: 1, alignItems: "center" }}>
          <Ionicons name="ios-add" size={45} color="green"/>
          <Text style={{color:"green"}}>Add a Spot</Text>
        </TouchableOpacity>) :
        (
        <React.Fragment>
        <TouchableOpacity testID='close'
          onPress={() => { setChoosePin(false); setFormVisible(true);}}
          style={{flex: 1, alignItems: "center" }}>
          <Ionicons name="ios-close" size={45} color="black" />
          <Text style={{color:"black"}}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { setChoosePin(false); setFormVisible(true); userChooseLocation(region); meowmeow(region)}}
          style={{ flex: 1, alignItems: "center" }}>
          <Ionicons name="ios-checkmark" size={45} color="green" />
          <Text style={{color:"green"}}>Confirm Location</Text>
      </TouchableOpacity>
      </React.Fragment>)
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomMenu: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
});

export default UserInput;
