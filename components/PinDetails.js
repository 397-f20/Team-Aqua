import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import Directions from "./Directions";
import Rate from "./Rate";
import WebView from "react-native-webview";
import RateModal from "./RateModal";
import RateList from "./RateList";
import RatingBarAvg from "./RatingBarAvg";

const PinDetails = ({ pin }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [rateVisible, setRateVisible] = useState(false);
  const [defaultRating, setDefaultRating] = useState(0);

  return (
    <ScrollView style={{ width: Dimensions.get("window").width * 0.9 }}>
      {rateVisible ? (
        <RateModal
          rateVisible={rateVisible}
          setRateVisible={setRateVisible}
          pin={pin}
        />
      ) : null}
      <TouchableOpacity onPress={() => {}}>
        {Platform.OS !== "android" ? (
          <Image style={styles.image} source={{ uri: `${pin["uri"]}` }} />
        ) : (
          <WebView style={styles.image} source={{ uri: `${pin["uri"]}` }} />
        )}
      </TouchableOpacity>
      <View style={styles.titlerate}>
        <Text style={styles.resultTitle}>{pin["title"]}</Text>
        <RatingBarAvg
                  defaultRating={Math.round(pin["averageRating"])}
                  setDefaultRating={setDefaultRating}
                />
      </View>
      <Text style={styles.resultText}>{pin["description"]}</Text>
      {pin["username"] ? (
        <Text style={styles.resultText}> Uploaded By {pin["username"]} </Text>
      ) : null}
      <Directions lat={+pin["latitude"]} long={+pin["longitude"]} />
      <Rate rateVisible={rateVisible} setRateVisible={setRateVisible} />
      <RateList ratings={pin["ratings"]} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  titlerate: {
    flexDirection: "row",
    flex: 3,
  },
  image: {
    height: Dimensions.get("window").height * 0.3,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
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
    flexDirection: "column",
    flex: 3,
  },
});

export default PinDetails;
