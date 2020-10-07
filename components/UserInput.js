import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Dimensions,
  View,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { firebase } from "../firebase";

const UserInput = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [uploading, setUpoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
      }
    })();
  }, []);

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

  const handleSubmit = async (id, lat, long, uri) => {
    const pin = {
      description: "world",
      title: "hello",
      id: id,
      latitude: `${lat}`,
      longitude: `${long}`,
      uri: uri,
    };

    // firebase
    //   .database()
    //   .ref("markers")
    //   .child(id)
    //   .set(pin)
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // var newKey = firebase.database().ref().child("markers").push().key;

    // firebase
    //   .database()
    //   .ref("markers/" + newKey)
    //   .set(pin)
    //   .catch((error) => {
    //     console.log(error);
    //   });

    firebase
      .database()
      .ref("markers")
      .push(pin)
      .catch((error) => {
        console.log(error);
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    setImage(result.uri);

    const remoteUri = await uploadPhotoAsync(image);

    // const task = firebase.storage().ref("Hello").putFile(image);

    // console.log(remoteUri);

    const id = generateUniqueId();
    const lat = Math.round(location["coords"].latitude * 1000000) / 1000000;
    const long = Math.round(location["coords"].longitude * 1000000) / 1000000;

    handleSubmit(id, lat, long, remoteUri);
  };

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity
        onPress={pickImage}
        style={{ flex: 1, alignItems: "center" }}
      >
        <Ionicons
          name="ios-add"
          size={45}
          color="black"
          title="Pick an image from camera roll"
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
});

export default UserInput;
