// React Native Custom Star Rating Bar
// https://aboutreact.com/react-native-custom-star-rating-bar/

// import React in our code
import React, { useState } from 'react';
import RateModal from './RateModal';
// import all the components we are going to use
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

const RatingBar = ( {
    defaultRating, 
    setDefaultRating,
}
) => {
  // To set the default Star Selected
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  // Filled Star. You can also give the path from local
  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
  // Empty Star. You can also give the path from local
  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating
                    ? { uri: starImageFilled }
                    : { uri: starImageCorner }
                }
              />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        
        {/*View to hold our Stars*/}
        <CustomRatingBar />
        
      </View>
    </SafeAreaView>
  );
};

export default RatingBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "center",
    alignItems: 'flex-end',
  },
  customRatingBarStyle: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: 0,
  },
  starImageStyle: {
    width: 20,
    height: 20,
    resizeMode: 'cover',
  },
});
