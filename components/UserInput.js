import React, { useState, useEffect } from "react";
import SelectImage from "./SelectImage";
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Button
} from "react-native";
import * as Location from "expo-location";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from 'react-native-modal';

const UserInput = () => {
  const [location, setLocation] = useState(null);
  const [uploading, setUpoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);

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

  const uploadPhotoAsync = async (url) => {
    const path = `post_images/${Date.now()}.jpeg`;
    return new Promise(async (res, rej) => {
      const response = await fetch(url);
      const file = await response.blob();
      const upload = firebase.storage().ref(path).put(file);
      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadURL();
          res(url);
        }
      );
    });
  };

  const generateUniqueId = () => {
    return `${Math.random().toString(36).substr(2, 9)}`;
  };

  const ImageForm = ({ formVisible, setFormVisible }) => {
    // const task = firebase.storage().ref("Hello").putFile(image);
    // console.log(remoteUri);
    const [image, setImage] = useState(null);
    const handleSubmit = async () => {
      const remoteUri = await uploadPhotoAsync(image);
      const id = generateUniqueId();
      const lat = Math.round(location["coords"].latitude * 1000000) / 1000000;
      const long = Math.round(location["coords"].longitude * 1000000) / 1000000;
      const pin = {
        description: "world",
        title: "hello",
        id: id,
        latitude: `${lat}`,
        longitude: `${long}`,
        uri: remoteUri,
      };
  
      firebase
        .database()
        .ref("markers")
        .push(pin, (error) => { error ? console.log('Error has occured during uploading this pin') : setFormVisible(false); })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
        <Modal isVisible={formVisible}>
          <View style={styles.form}>
            <Text>Upload Images</Text>
            <Text>Longitude</Text>
            <Text>Latitude</Text>
            <SelectImage image = {image} setImage = {setImage}/>
            <Button
            onPress={() => handleSubmit()}
            title="Upload"
            color="#841584"
            />
          </View>
        </Modal>
    );
  };

  return (
    <View style={styles.bottomMenu}>
      {formVisible ? (
          <ImageForm
            formVisible={formVisible}
            setformVisible={setFormVisible}
          />
        ) : null}
      <TouchableOpacity
        onPress={() => setFormVisible(true)}
        style={{ flex: 1, alignItems: "center" }}
      >
      <Ionicons
        name="ios-add"
        size={45}
        color="black"
        title="Open image form"
      />
        <Text>Add a Spot</Text>
      </TouchableOpacity>
    </View>
  );
};

styles = StyleSheet.create({
  bottomMenu: {
    flex: 1,
    alignItems: "center",
  },
  form:{
    flex: 1,
    backgroundColor: "white",
  }
});

export default UserInput;
