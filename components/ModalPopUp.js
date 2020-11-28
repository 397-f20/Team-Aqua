import React from "react";
import {
  View,
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import PinDetails from "./PinDetails";
import PinList from "./PinList";

// Info I got from Riesbeck about the database issue:
// database calls should be in useEffect
// App.js is loaded alot, while ModalPopup is loaded once
// Make a state variable for dummy_pins
// get pin data in App, load default data, then you load firebase data

const ModalPopUp = ({
  modalVisible,
  setModalVisible,
  pin,
  caller,
  pinData,
}) => {
  var res = null;
  var item = null;

  if (caller === "marker") {
    for (item in pinData["markers"]) {
      if (item === pin["pin"]) {
        res = pinData["markers"][item];
      }
    }
  } else if (caller === "search") {
    res = [];
    for (item in pinData["markers"]) {
      if (
        pinData["markers"][item]["title"]
          .toLowerCase()
          .includes(pin.toLowerCase()) ||
        pinData["markers"][item]["description"]
          .toLowerCase()
          .includes(pin.toLowerCase())
      ) {
        res.push(pinData["markers"][item]);
      }
    }
  }

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {
          setModalVisible(false);
        }}
      />
      <View style={styles.modalView}>
        {caller === "marker" ? (
          <PinDetails pin={res} />
        ) : (
          <PinList pins={res} />
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderRadius: 10,
    paddingTop: 15,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.49,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container: {
    flex: 1,
    height: Dimensions.get("window").height * 0.5,
    top: 0,
  },
});

export default ModalPopUp;
