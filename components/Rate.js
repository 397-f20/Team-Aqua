import React from "react";
import { Button, SafeAreaView } from "react-native";

const Rate = ({ rateVisible, setRateVisible }) => {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      <Button color="green" title="Add rating" onPress={setRateVisible} />
    </SafeAreaView>
  );
};

export default Rate;
