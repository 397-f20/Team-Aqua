import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import {
  Image,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SearchBar } from "react-native-elements";
import ModalPopUp from "./components/ModalPopUp";
import UserInput from "./components/UserInput";
import { firebase } from "./firebase";
import marker from "./assets/icons8-marker.png";

export default function App() {
  const [auth, setAuth] = useState();
  const [user, setUser] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [pinSelected, setPinSelected] = useState(null);
  const [caller, setCaller] = useState("");
  const [choosePin, setChoosePin] = useState(false);
  const [pinData, setPinData] = useState(null);
  const [region, setRegion] = useState({
    latitude: 42.047455,
    longitude: -87.680657,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged((auth) => {
      setAuth(auth);
    });
  }, []);

  useEffect(() => {
    if (auth && auth.uid) {
      const db = firebase.database().ref("users").child(auth.uid);
      const handleData = (snap) => {
        const val = snap.val();
        setUser({ uid: auth.uid, ...val });
      };
      db.on("value", handleData, (error) => alert(error));
      return () => {
        db.off("value", handleData);
      };
    } else {
      setUser(null);
    }
  }, [auth]);

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

  //USE THIS TO UPDATE WHOLE DATABASE LATER ON!!!!!
  // useEffect(() => {
  //   Object.keys(pinData.markers).map((pinId) => {
  //     firebase
  //       .database()
  //       .ref("markers/" + pinId)
  //       .update({
  //         averageRating: 5,
  //         ratings: [
  //           {
  //             rating: 5,
  //             description: "",
  //             username: user.username,
  //             userId: user.uid,
  //           },
  //         ],
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   });
  // });

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
    <UserContext.Provider value={user}>
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
            onRegionChange={(region) => {
              setRegion(region);
            }}
          >
            {pinData &&
              Object.keys(pinData.markers).map((pin, i) => (
                <Marker
                  coordinate={{
                    latitude: +pinData.markers[pin].latitude,
                    longitude: +pinData.markers[pin].longitude,
                  }}
                  onPress={() => {
                    setCaller("marker");
                    setPinSelected({ pin });
                    setModalVisible(!modalVisible);
                  }}
                  identifier={pin}
                  key={i}
                />
              ))}
          </MapView>
          {choosePin && (
            <View style={styles.markerFixed}>
              <Image source={marker} />
            </View>
          )}
          {modalVisible ? (
            <ModalPopUp
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              pin={pinSelected}
              caller={caller}
              pinData={pinData}
            />
          ) : null}
          <UserInput
            region={region}
            choosePin={choosePin}
            setChoosePin={setChoosePin}
          />
        </SafeAreaView>
      </View>
    </UserContext.Provider>
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
  markerFixed: {
    left: Dimensions.get("window").width * 0.5 - 64,
    position: "absolute",
    top: Dimensions.get("window").height * 0.5 - 124,
  },
});
