import React, { useState } from "react";
import { Image, ScrollView, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';
import ImageView from 'react-native-image-view';
import Directions from './Directions';

const PinDetails = ({ pin }) => {
  const [imageVisible, setImageVisible] = useState(false);
  return (
    <ScrollView style={{width: Dimensions.get("window").width * 0.9}}>
    <TouchableOpacity
    onPress={() => {
    }}
    >
      <Image style={styles.image} source={{ uri: `${pin["uri"]}` }} />
      </TouchableOpacity>
      <Text style={styles.resultTitle}>{pin["title"]}</Text>
      <Text style={styles.resultText}>{pin["description"]}</Text>
      <Directions  lat = {+pin["latitude"]} long = {+pin["longitude"]} />
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
