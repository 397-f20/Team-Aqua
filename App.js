import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SearchBar } from "react-native-elements";
import ModalPopUp from "./components/ModalPopUp";
import dummy_pins from "./dummy_pins.json";
import UserInput from "./components/UserInput";
import { firebase } from "./firebase";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pinSelected, setPinSelected] = useState(null);
  const [caller, setCaller] = useState("");
  const [pinData, setPinData] = useState(dummy_pins);
  const [region, setRegion] = useState({
    latitude: 42.047455,
    longitude: -87.680657,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });
 
  useEffect(() => {
    const pins = firebase.database().ref();
    const handleData = (snap) => {
      if (snap.val()) {
        setPinData(snap.val());
      }
    };
    pins.on("value", handleData, (error) => console.log(error));
    return () => {
      pins.off("value", handleData);
    };
  }, []);

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

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SearchBar
          platform="default"
          placeholder="Look up your favourite spots..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={onSearchButtonPress}
          lightTheme={true}
        />
        <MapView
          provider="google"
          style={styles.mapContainer}
          initialRegion={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onRegionChangeComplete={setRegion}
        >
        {Object.keys(pinData.markers).map((pin, i) => (
          <Marker
            coordinate={{
              latitude: +pinData.markers[pin].latitude,
              longitude: +pinData.markers[pin].longitude,
            }}
            onPress={() => {
              setCaller("marker");
              setPinSelected({pin});
              setModalVisible(!modalVisible);
            }}
            identifier={pin}
            key={i}
          />
        ))}
        </MapView>
        {modalVisible ? (
          <ModalPopUp
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            pin={pinSelected}
            caller={caller}
            pinData={pinData}
          />
        ) : null}
        <UserInput region = {region} setRegion = {setRegion}/>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  mapContainer: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.75,
  },
});
