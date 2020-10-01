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
import WebView from "react-native-webview";

const ModalPopUp = ({ modalVisible, setModalVisible, pinId }) => {
  const currentPin = dummy_pins["markers"].filter(function (item) {
    return item.id === pinId;
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      //presentationStyle = {"fullScreen"}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
      }}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => {
          setModalVisible(false);
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <WebView
            style={styles.image}
            source={{ uri: `${currentPin[0].uri}` }}
          />
          <Text style={styles.modalText}>{currentPin[0].title}</Text>
          <Text style={styles.modalText}>{currentPin[0].description}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 400,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    padding: 55,
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    height: Dimensions.get("window").height * 0.5,
    top: 0,
  },
});

export default ModalPopUp;
