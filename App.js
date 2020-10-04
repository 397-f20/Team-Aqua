import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { WebView } from "react-native-webview";
import { SearchBar } from "react-native-elements";
import ModalPopUp from "./components/ModalPopUp";
import dummy_pins from "./dummy_pins.json";
import UserInput from "./components/UserInput"

export default function App() {
  var text = "";
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pinSelected, setPinSelected] = useState(0);
  const [caller, setCaller] = useState("");

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
          style={styles.mapContainer}
          initialRegion={{
            latitude: 42.047455,
            longitude: -87.680657,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
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
        </MapView>
        {modalVisible ? (
          <ModalPopUp
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            pinId={pinSelected}
            caller={caller}
          />
        ) : null}
        <UserInput />
      </SafeAreaView>
    </View>
  );
}

// class CustomCalloutView extends React.Component {
//   render() {
//     return (
//       <View>
//         <View>
//           <Text
//             style={{
//               fontWeight: "bold",
//             }}
//           >
//             Test
//           </Text>
//         </View>
//         <View>
//           <WebView
//             style={{ height: 100, width: 100 }}
//             source={{ uri: "https://facebook.github.io/react/logo-og.png" }}
//           />
//         </View>
//       </View>
//     );
//   }
// }

const styles = StyleSheet.create({
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
