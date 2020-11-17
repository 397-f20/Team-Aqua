import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RatingBar from "./RatingBar";

const RateList = ({ ratings }) => {
  return (
    <View>
      {Object.keys(ratings).map((ratingId, i) => (
        <View style={styles.listItem} key={i}>
          <FontAwesome name="user-circle-o" size={40} color="grey" />
          <Text style={styles.userName}>{ratings[ratingId].username}</Text>
          <Text style={styles.rating}>{ratings[ratingId].rating}</Text>
          {ratings[ratingId].description === "" ? null : (
            <Text style={styles.description}>
              {/* {"\n"} */}
              {ratings[ratingId].description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    borderStyle: "solid",
    flexDirection: "row",
    borderColor: "#eee",
    // justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 2,
    borderTopWidth: 2,
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginTop: 5,
  },
  rating: {
    marginLeft: 10,
    textAlign: "left",
    marginTop: 5,
  },
  description: {
    marginLeft: 10,
    textAlign: "left",
    marginTop: 5,
  },
});

export default RateList;
