import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import RatingBarList from "./RatingBarList";

const RateList = ({ ratings }) => {
  const [defaultRating, setDefaultRating] = useState(0);
  return (
    <View>
      {Object.keys(ratings).map((ratingId, i) => (
        <View style={styles.listItem} key={i}>
          <FontAwesome name="user-circle-o" size={40} color="grey" />
          <Text style={styles.userName}>{ratings[ratingId].username}</Text>
          <RatingBarList
            defaultRating={ratings[ratingId].rating}
            setDefaultRating={setDefaultRating}
          />
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
    flexDirection: "column",
    borderColor: "#bbb",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 2,
  },
  userName: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "left",
    marginTop: 5,
    flexDirection: "column",
    flex: 6,
  },
  rating: {
    marginLeft: 10,
    textAlign: "left",
    marginTop: 5,
    flexDirection: "column",
    flex: 6,
  },
  description: {
    marginLeft: 10,
    textAlign: "left",
    marginTop: 5,
  },
});

export default RateList;
