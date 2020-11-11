import React, { useState } from "react";
import {
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

const PinDetails = ({ pin }) => {
  const [imageVisible, setImageVisible] = useState(false);
  const [rateVisible, setRateVisible] = useState(false);

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
      <Text style={styles.resultTitle}>{pin["title"]}</Text>
      <Text style={styles.resultText}>{pin["description"]}</Text>
      {pin["username"] ? (
        <Text style={styles.resultText}> Uploaded By {pin["username"]} </Text>
      ) : null}
      <Directions lat={+pin["latitude"]} long={+pin["longitude"]} />
      <Rate rateVisible={rateVisible} setRateVisible={setRateVisible} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  },
});

export default PinDetails;
