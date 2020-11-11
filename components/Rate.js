import React, { useEffect } from "react";
import { Button, Image, SafeAreaView, Platform, TouchableOpacity, Text } from "react-native";
import Constants from "expo-constants";
import PinDetails from "./PinDetails";
import RateModal from "./RateModal";


const Rate = ({
    rateVisible,
    setRateVisible,
}) => {     

    return(
      <SafeAreaView style={{ flex: 1, alignItems: "center" }}>

      <Button
        color="green"
        title="Add rating"
        onPress={setRateVisible}
      />

      </SafeAreaView>

    );

};

export default Rate;