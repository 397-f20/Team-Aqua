import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Dimensions, Image } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { WebView } from "react-native-webview";

export default function App() {
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
      >
        <Marker coordinate={{ latitude: 42.035647, longitude: -87.669332 }}>
          <Callout>
            <CustomCalloutView />
          </Callout>
        </Marker>
      </MapView>
      <StatusBar style="auto" />
    </SafeAreaView>
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
});
