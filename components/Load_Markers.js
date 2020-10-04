import React from 'react';
import firebase, {dummy_pins} from '../firebase';
import {Marker} from 'react-native-maps';

const Load_Markers = () => {

  return (
          dummy_pins["markers"].map((pin) => (
            <Marker
              coordinate={{
                latitude: +pin.latitude,
                longitude: +pin.longitude,
              }}
              onPress={() => {
                setCaller("marker");
                setPinSelected(pin.id);
                setModalVisible(!modalVisible);
              }}
              identifier={pin.id}
              key={pin.id}
            />
          ))
		  )
};

export default Load_Markers;