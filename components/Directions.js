import React from "react";
import { Button, SafeAreaView } from "react-native";
import { OpenMapDirections } from "react-native-navigation-directions";

const Directions = ({ lat, long }) => {
  const callMaps = () => {
    const endPoint = {
      longitude: long,
      latitude: lat,
    };
    const transportPlan = "d";

    OpenMapDirections(null, endPoint, transportPlan).then((res) => {
      console.log(res);
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Button color="green" title="Find directions" onPress={callMaps} />
    </SafeAreaView>
  );
};

export default Directions;
