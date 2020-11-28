import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import SelectImage from "./SelectImage";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  buttonState,
  Dimensions,
} from "react-native";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Form from "./Form";
import * as yup from "yup";

const InputModal = ({
  formVisible,
  setFormVisible,
  location,
  choosePin,
  setChoosePin,
}) => {
  const currentUser = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [error, setError] = useState("");
  const [titleInput, setTitleInput] = useState("Spot title");
  const [descInput, setDescInput] = useState("description");

  // Store array of filePath, title, description
  const validationSchema = yup.object().shape({
    title: yup
      .string()
      .required()
      .notOneOf(
        ["Spot title"],
        "Give your spot a title! Set location to update."
      )
      .label("Title"),
    description: yup
      .string()
      .required()
      .notOneOf(
        ["description"],
        "Give your spot a description! Set location to update."
      )
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
      uid: currentUser.uid,
      username: currentUser.username,
      averageRating: 5,
      ratings: [
        {
          rating: 5,
          description: "",
          username: currentUser.username,
          userID: currentUser.uid,
        },
      ],
    };

    firebase
      .database()
      .ref("markers")
      .push(pin, (error) => {
        error
          ? console.log("Error has occured during uploading this pin")
          : setFormVisible(false);
      })
      .then((snapshot) => {
        firebase
          .database()
          .ref("markers/" + snapshot.key)
          .update({ id: snapshot.key });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <View>
      {!choosePin ? (
        <SafeAreaView style={styles.webview}>
          <Modal isVisible={formVisible} avoidKeyboard={true}>
            <View>
              <TouchableOpacity
                testID="close"
                onPress={() => setFormVisible(false)}
              >
                <Ionicons name="ios-close" size={45} color="white" />
              </TouchableOpacity>

              <Form
                style={styles.form}
                initialValues={{ title: titleInput, description: descInput }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  if (image) {
                    handleSubmit(values);
                  } else {
                    setImageError(true);
                  }
                }}
              >
                <SelectImage image={image} setImage={setImage} />
                {imageError ? (
                  <Text
                    style={{
                      fontSize: 16,
                      marginTop: 5,
                      color: "#fc5c65",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Image is required
                  </Text>
                ) : null}
                <Form.Field
                  name="title"
                  leftIcon="map-search"
                  value={titleInput}
                  onChangeText={(text) => setTitleInput(text)}
                  // Load from useState
                />
                <Form.Field
                  name="description"
                  leftIcon="subtitles"
                  value={descInput}
                  onChangeText={(text) => setDescInput(text)}
                  // Load from useState
                />

                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      setChoosePin(true);
                    }}
                  >
                    <Text style={{ color: "white" }}>Set Location</Text>
                  </TouchableOpacity>
                </View>

                <Form.Button
                  color="black"
                  title={"Add Your Spot"}
                  disabled={buttonState}
                />
                {<Form.ErrorMessage error={error} visible={true} />}
              </Form>
            </View>
          </Modal>
        </SafeAreaView>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 25,
    width: Dimensions.get("window").width * 0.9,
    alignItems: "center",
  },
  webview: {
    position: "absolute",
    top: Dimensions.get("window").height * -0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    alignContent: "center",
    position: "absolute",
    left: 500,
  },
});

export default InputModal;
