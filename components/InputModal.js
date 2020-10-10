import React, { useState } from "react";
import SelectImage from "./SelectImage";
import { StyleSheet, SafeAreaView, View, TouchableOpacity } from "react-native";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Form from "./Form";
import * as yup from "yup";

const InputModal = ({ formVisible, setFormVisible, location }) => {
  const [image, setImage] = useState(null);
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
    <SafeAreaView style={styles.form}>
      <Modal isVisible={formVisible} avoidKeyboard={true}>
        <View>
          <TouchableOpacity onPress={() => setFormVisible(false)}>
            <Ionicons name="ios-close" size={45} color="white" />
          </TouchableOpacity>
          <SelectImage image={image} setImage={setImage} />
          <Form
            initialValues={{ title: "", description: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form.Field
              name="title"
              leftIcon="map-search"
              placeholder="Name of the Spot"
            />
            <Form.Field
              name="description"
              leftIcon="subtitles"
              placeholder="How would you describe this Spot?"
            />
            <Form.Button color="black" title={"Add the Spot"} />
            {<Form.ErrorMessage error={error} visible={true} />}
          </Form>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default InputModal;
