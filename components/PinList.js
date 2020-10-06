import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import AutoHeightWebView from 'react-native-autoheight-webview';

const PinList = ({ pins }) => {

  if (pins.length > 0) {
    return (
      <ScrollView style={{width: Dimensions.get("window").width}}>
        {pins.map((pin) => (
          <TouchableOpacity style={styles.listItem} key={pin.id}>
            <AutoHeightWebView
              style={styles.image}
              source={{ uri: `${pin.uri}` }}
              scrollEnabled={false}
              scalesPageToFit={true}
            />
            <View style={{flex: 3}}>
              <Text style={styles.resultTitle}>{pin.title}</Text>
              <Text style={styles.resultText}>{pin.description}</Text>
            </View>
          </TouchableOpacity>
        ))
        }
      </ScrollView>
  );
  }

  else {
  return (
    <Text style={styles.noResultText}>No results</Text>
  );
}
};

const styles = StyleSheet.create({
  listItem: {
    borderStyle: "solid",
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent:"flex-start",
    padding: 15,
    borderBottomWidth: 2
  },
  image: {
    height: Dimensions.get("window").height * 0.1,
    width: Dimensions.get("window").height * 0.1,
    flex: 1,
    borderRadius: 10
  },
  resultTitle: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginTop: 5,
  },
  resultText: {
    textAlign: "left",
    marginTop: 5,
  },
  noResultText: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
});

export default PinList;
