import React, { useEffect } from "react";
import { Button, Image, SafeAreaView, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import { OpenMapDirections } from "react-native-navigation-directions";

const Directions = ({lat, long}) => {

    const callMaps= () => {
        const endPoint = {
            longitude: long,
            latitude: lat
        }
        const transportPlan = 'd';

        OpenMapDirections(null, endPoint,transportPlan).then(res => {console.log(res)})
    };

    return(
      <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
        <Button
          color="green"
          title="Find directions"
          onPress={callMaps}
        />
      </SafeAreaView>
    );

};

export default Directions;