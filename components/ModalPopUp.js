import React, { Component } from "react";
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
import dummy_pins from "../dummy_pins.json";
import PinDetails from "./PinDetails";
import PinList from "./PinList";

const ModalPopUp = ({ modalVisible, setModalVisible, pinId, caller }) => {
  var res = null;
  if (caller === "marker") {
    res = dummy_pins["markers"].filter(function (item) {
      return item.id === pinId;
    });
  }
  else if (caller === "search") {
    res = dummy_pins["markers"].filter(function (item) {
      return item.title.toLowerCase().includes(pinId.toLowerCase())
      || item.description.toLowerCase().includes(pinId.toLowerCase());
    });
    console.log(pinId);
    console.log(res.length);
    console.log(res);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {
          setModalVisible(false);
        }}
      />
      <View style={styles.modalView}>
        {caller === "marker" ? <PinDetails pin={res} /> : <PinList pins={res} />}
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
