import React, { useState } from "react";
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";

const RateList = ({ ratings }) => {
  console.log(Object.keys(ratings));
  console.log(ratings[0]);
  return (
    <View>
      {Object.keys(ratings).map((ratingId) => (
        <TouchableOpacity style={styles.listItem}>
          <View style={{ flex: 3 }}>
            <Text style={styles.resultTitle}>{ratings[ratingId].rating}</Text>
            <Text style={styles.resultText}>
              {ratings[ratingId].description}
            </Text>
            <Text style={styles.resultText}>{ratings[ratingId].username}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderStyle: "solid",
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 15,
    borderBottomWidth: 2,
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
});

export default RateList;
