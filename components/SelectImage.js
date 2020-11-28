import React, { useEffect } from "react";
import {
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  Text,
  Dimensions,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const SelectImage = ({ image, setImage }) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        {image ? (
          <Text style={{ color: "white" }}>Change Image</Text>
        ) : (
          <Text testID="chooseImage" style={{ color: "white" }}>
            Choose an Image for Your Spot
          </Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "green",
    alignItems: "center",
    padding: 15,
    marginTop: 10,
    borderRadius: 25,
    width: Dimensions.get("window").width * 0.9,
  },
});

export default SelectImage;
