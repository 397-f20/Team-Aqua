import { StatusBar } from "expo-status-bar";
<<<<<<< Updated upstream
import React from "react";
import { StyleSheet, Text, SafeAreaView, Dimensions, View } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

export default function App() {
=======
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SearchBar } from "react-native-elements";
import ModalPopUp from "./components/ModalPopUp";
import dummy_pins from "./dummy_pins.json";
import UserInput from "./components/UserInput";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { Formik } from "formik";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pinSelected, setPinSelected] = useState(0);
  const [inputModal, setInputModal] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [caller, setCaller] = useState("");

  useEffect(() => {
    Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setIsReady(true);
  });

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const onSearchButtonPress = (query) => {
    if (searchQuery.trim().length > 0) {
      setCaller("search");
      setPinSelected(searchQuery);
      setModalVisible(true);
    }
  };

>>>>>>> Stashed changes
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.mapContainer}
        initialRegion={{
          latitude: 42.047455,
          longitude: -87.680657,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showUserLocation={true}
      >
        <Marker
          title="Dempster Beach"
          description="Best Sunrise Spot Evanston"
          coordinate={{ latitude: 42.035647, longitude: -87.669332 }}
        >
<<<<<<< Updated upstream
          <Callout>
            <View>
              <Text>Hello World!</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>
      <StatusBar style="auto" />
    </SafeAreaView>
=======
          {dummy_pins["markers"].map((pin) => (
            <Marker
              coordinate={{
                latitude: +pin.latitude,
                longitude: +pin.longitude,
              }}
              onPress={() => {
                setCaller("marker");
                setPinSelected(pin.id);
                setModalVisible(!modalVisible);
              }}
              identifier={pin.id}
              key={pin.id}
            />
          ))}
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => {
              setInputModal(!inputModal);
            }}
          >
            <Ionicons name="ios-add-circle" size={50} color="blue" />
          </TouchableOpacity>
        </MapView>
        {modalVisible ? (
          <ModalPopUp
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            pinId={pinSelected}
            caller={caller}
          />
        ) : null}
        {inputModal ? (
          <UserInput inputModal={inputModal} setInputModal={setInputModal} />
        ) : null}
        <StatusBar style="light-content" />
      </SafeAreaView>
    </View>
>>>>>>> Stashed changes
  );
}

const styles = StyleSheet.create({
  createButton: {
    position: "absolute",
    right: 10,
    bottom: 0,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});
