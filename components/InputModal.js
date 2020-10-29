import React, { useState } from "react";
import SelectImage from "./SelectImage";
import { Image, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, buttonState, Dimensions } from "react-native";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Form from "./Form";
import * as yup from "yup";
import marker  from '../assets/icons8-marker.png';

const InputModal = ({ formVisible, setFormVisible, location, region, choosePin, setChoosePin}) => {
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");

  const validationSchema = yup.object().shape({
    title: yup.string().required().label("Title"),
    description: yup
      .string()
      .required()
      .max(200, "Must be less than 200 words")
      .label("Description"),
  });

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

  const handleSubmit = async (values) => {
    setFormVisible(false);
    console.log("2")
    console.log(buttonState)
    const { title, description } = values;
    const remoteUri = await uploadPhotoAsync(image);
    const id = generateUniqueId();
    const lat = Math.round(location["coords"].latitude * 1000000) / 1000000;
    const long = Math.round(location["coords"].longitude * 1000000) / 1000000;
    const pin = {
      description: description,
      title: title,
      id: id,
      latitude: `${lat}`,
      longitude: `${long}`,
      uri: remoteUri,
    };
    console.log(pin)

    firebase
      .database()
      .ref("markers")
      .push(pin, (error) => {
        error
          ? console.log("Error has occured during uploading this pin")
          : setFormVisible(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <SafeAreaView>
      <Modal isVisible={formVisible} avoidKeyboard={true}>
        <View>
          <TouchableOpacity testID='close' onPress={() => setFormVisible(false)}>
            <Ionicons name="ios-close" size={45} color="white" />
          </TouchableOpacity>

          <Form
            initialValues={{ title: "", description: ""}}
            validationSchema={validationSchema}
            onSubmit={(values) => {
                                    if(image){
                                      handleSubmit(values);
                                    }
                                    else{
                                      setImageError(true);
                                    }
                                  }
                      }
          >
            <SelectImage image={image} setImage={setImage} />
            {imageError ? <Text style={{fontSize: 16, marginTop: 5, color:'#fc5c65', fontWeight: 'bold', textAlign: 'center'}}>
                          Image is required</Text> : null}
            <Form.Field
              name="title"
              leftIcon="map-search"
              placeholder="Spot Name"
            />
            <Form.Field
              name="description"
              leftIcon="subtitles"
              placeholder="Description"
            />

            <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
              <TouchableOpacity
                style={styles.button}
                onPress = { () => setChoosePin(true) & setFormVisible(false)  }>
                <Text style={{color: "white"}}>Set Location</Text>
              </TouchableOpacity>
            </SafeAreaView>

            <Form.Button color="black" title={"Add Your Spot"} disabled={buttonState} />
            {<Form.ErrorMessage error={error} visible={true} />}
          </Form>
        </View>
      </Modal>

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25
  }
});

export default InputModal;
