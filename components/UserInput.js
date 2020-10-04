import React, {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Dimensions, View, Modal, Image} from 'react-native';


const UserInput = () =>{
    const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Ionicons name="ios-add" size={24} color="black" onClick = {pickImage()} title="Pick an image from camera roll" />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}

styles = StyleSheet.create({
    modalView: {
        backgroundColor: "white",
        position: "absolute",
        bottom: 0,
        borderRadius: 20,
        paddingTop: 15,
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height * 0.5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
})

export default UserInput;