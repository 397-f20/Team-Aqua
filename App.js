import { StatusBar } from "expo-status-bar";
import React, {Component} from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Image, Modal, TouchableHighlight } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { WebView } from "react-native-webview";
import { SearchBar } from "react-native-elements";
import ModalPopUp from "./components/ModalPopUp";


export default function App() {

	var text = '';
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(false);


  const onChangeSearch = query => {
	  setSearchQuery(query);

  }
  const onSearchButtonPress = () => {
    setSearchQuery("works!");
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SearchBar
          style={styles.searchBar}
          platform="default"
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={onSearchButtonPress}
          lightTheme={true}
        />

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>

        <MapView
          style={styles.mapContainer}
          initialRegion={{
            latitude: 42.047455,
            longitude: -87.680657,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}

        >
          <Marker
          coordinate={{ latitude: 42.035647, longitude: -87.669332 }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
          />
      </MapView>
			{modalVisible? <ModalPopUp state={true}/> : null}

      <StatusBar style="light-content" />
	   <Text style={styles.results}>
	    {searchQuery}
	  </Text>

    </SafeAreaView>
    </View>
  );
}

class CustomCalloutView extends React.Component {
    render() {
        return (
            <View>
                <View>
                  <Text style={{
                      fontWeight: "bold",
                  }}>
					Test
                </Text>
                </View>
                <View>
                  <WebView style={{ height: 100 , width: 100, }} source={{ uri: 'https://facebook.github.io/react/logo-og.png' }} />
                </View>
            </View>

        )
    }
}

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
  results: {
    marginTop: '2%',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
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
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
