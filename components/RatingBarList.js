import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Image } from "react-native";

const RatingBarList = ({ defaultRating, setDefaultRating }) => {
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png";
  // Empty Star. You can also give the path from local
  const starImageCorner =
    "https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png";

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <Image
              style={styles.starImageStyle}
              key={item}
              source={
                item <= defaultRating
                  ? { uri: starImageFilled }
                  : { uri: starImageCorner }
              }
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <CustomRatingBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "center",
    textAlign: "center",
  },
  customRatingBarStyle: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10,
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: "cover",
  },
});

export default RatingBarList;
