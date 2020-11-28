import React, { useContext, useState } from "react";
import UserContext from "../UserContext";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  buttonState,
} from "react-native";
import { firebase } from "../firebase";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Form from "./Form";
import * as yup from "yup";
import RatingBar from "./RatingBar";

const RateModal = ({ rateVisible, setRateVisible, pin }) => {
  const currentUser = useContext(UserContext);
  const [error, setError] = useState("");
  const [defaultRating, setDefaultRating] = useState(0);

  const validationSchema = yup.object().shape({
    description: yup
      .string()
      .required()
      .max(200, "Must be less than 200 words")
      .label("Description"),
  });

  const calculateAverage = (rating) => {
    const currentLen = Object.keys(pin["ratings"]).length;
    return (currentLen * pin["averageRating"] + rating) / (currentLen + 1);
  };

  const handleSubmit = async (values) => {
    setRateVisible(false);

    const { description } = values;

    const rating = {
      rating: defaultRating,
      description: description,
      username: currentUser.username,
      userID: currentUser.uid,
    };

    const newAvg = calculateAverage(defaultRating);

    firebase
      .database()
      .ref("markers/" + pin.id + "/ratings/")
      .push(rating, (error) => {
        error
          ? console.log("Error has occured during uploading this pin")
          : setRateVisible(false);
      })
      .then(() => {
        firebase
          .database()
          .ref("markers/" + pin.id)
          .update({ averageRating: newAvg });
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
      });
  };

  return (
    <View>
      <SafeAreaView>
        <Modal isVisible={rateVisible} avoidKeyboard={true}>
          <View>
            <TouchableOpacity
              testID="close"
              onPress={() => setRateVisible(false)}
            >
              <Ionicons name="ios-close" size={45} color="white" />
            </TouchableOpacity>

            <Form
              initialValues={{ description: "" }}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              <RatingBar
                defaultRating={defaultRating}
                setDefaultRating={setDefaultRating}
              />

              <Form.Field
                name="description"
                leftIcon="subtitles"
                placeholder="Rating Description"
              />
              <Form.Button
                color="black"
                title={"Add Rating"}
                disabled={buttonState}
              />

              {<Form.ErrorMessage error={error} visible={true} />}
            </Form>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

export default RateModal;
