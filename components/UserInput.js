import React, {useState, useEffect} from 'react';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {StyleSheet, Dimensions, View, Modal, Text, Image, TouchableOpacity} from 'react-native';

const UserInput = () =>{
  const [image, setImage] = useState(null);

  useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
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
