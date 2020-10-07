import React, {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Dimensions, View, Modal, Text, Image, TouchableOpacity, PermissionsAndroid, Platform} from 'react-native';
import * as Location from 'expo-location';

const UserInput = () =>{
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState(null);
  useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync(); 
        }
      })();
      }, []);

      useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            console.log("user is dumb")
          }
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        })();
      }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri)
    setImage(result.uri)
    
    console.log("latitude:")
    console.log(location["coords"].latitude)
    console.log("longitude:")
    console.log(location["coords"].longitude)
  }
  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity onPress={pickImage} style={{flex: 1, alignItems: "center"}}>
        <Ionicons name="ios-add" size={45} color="black" title="Pick an image from camera roll" />
        <Text>Add a Spot</Text>
      </TouchableOpacity>
    </View>
  );
}

styles = StyleSheet.create({
    bottomMenu: {
      flex: 1,
      alignItems: "center"
    },
})

export default UserInput;
