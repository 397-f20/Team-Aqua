import React from "react";
import { ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';

const PinDetails = ({ pin }) => {
  return (
    <ScrollView style={{width: Dimensions.get("window").width * 0.9}}>
      <AutoHeightWebView
        style={styles.image}
        source={{ uri: `${pin[0].uri}` }}
        scrollEnabled={false}
      />
      <Text style={styles.resultTitle}>{pin[0].title}</Text>
      <Text style={styles.resultText}>{pin[0].description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("window").height * 0.3
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "left",
    marginTop: 10,
  },
  resultText: {
    marginTop: 10,
    textAlign: "left",
  },
});

export default PinDetails;
