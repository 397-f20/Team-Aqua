import React, { useState } from "react";
import { ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';
import ImageView from 'react-native-image-view';

const PinDetails = ({ pin }) => {
  const [imageVisible, setImageVisible] = useState(false);
  return (
    <ScrollView style={{width: Dimensions.get("window").width * 0.9}}>
    <TouchableOpacity
    onPress={() => {
    }}
    >
      <AutoHeightWebView
        style={styles.image}
        source={{ uri: `${pin[0].uri}` }}
        scrollEnabled={false}
        scalesPageToFit={true}
      />
      </TouchableOpacity>
      <Text style={styles.resultTitle}>{pin[0].title}</Text>
      <Text style={styles.resultText}>{pin[0].description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("window").height * 0.3,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
