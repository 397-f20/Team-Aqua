import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import PinDetails from "./PinDetails";
import PinList from "./PinList";

// Info I got from Riesbeck about the database issue:
// database calls should be in useEffect
// App.js is loaded alot, while ModalPopup is loaded once
// Make a state variable for dummy_pins
// get pin data in App, load default data, then you load firebase data


const ModalPopUp = ({ modalVisible, setModalVisible, pinId, caller, pinData }) => {
  var res = null
  
  if (caller === "marker") {
    res = pinData["markers"].filter(function (item) {
      return item.id === pinId;
    });
  } else if (caller === "search") {
    res = pinData["markers"].filter(function (item) {
      return (
        item.title.toLowerCase().includes(pinId.toLowerCase()) ||
        item.description.toLowerCase().includes(pinId.toLowerCase())
      );
    });
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
    borderRadius: 20,
    paddingTop: 15,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.5,
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
