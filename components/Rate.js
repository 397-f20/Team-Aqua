import React, { useContext } from "react";
import { Button, SafeAreaView } from "react-native";
import UserContext from "../UserContext";

const Rate = ({ rateVisible, setRateVisible }) => {
  const currentUser = useContext(UserContext);
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center" }}>
      {currentUser ? (
        <Button
          color="green"
          title="Add rating"
          onPress={() => {
            setRateVisible(true);
          }}
        />
      ) : (
        <Button color="grey" title="Log in to add rating" />
      )}
    </SafeAreaView>
  );
};

export default Rate;
