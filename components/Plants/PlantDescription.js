import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

let dummyData = {
  name: 'PlantOne',
  owner: 'Brandon',
  location: 'LA',
  distance: '12 mi away',
  url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  favorite: true
};

// once a plant card is click
// potentially add description
const PlantDescription = (dummyData) => {

  const [requestTrade, setRequestTrade] = useState(false);
  const [fillHeart, setFillHeart] = useState('red');

  // // set back to false?????
  const _onTradeButton = () => {
    setRequestTrade(true);
  }

  // if (dummyData.favorite) {
  //   setFillHeart('red');
  // }

  return (
    <View style={styles.container}>
      <Image
        source={{ url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*' }}
        style={styles.plantImage}>
      </Image>
      <View style={styles.plantInfoContainer}>
        <View>
          <View style={styles.plantNameWithHeart}>
            <Text style={styles.title}>Plant One</Text>
            <Fontisto name="heart" size={20} color={fillHeart} style={styles.heart} />
          </View>
          <Text>Brandon</Text>
          <Text>{`LA (12 mi away)`}</Text>
        </View>
        <View>
          <Text style={styles.title}>Description:</Text>
          <Text>{`I'm a Barbie girl, in the Barbie world\nLife in plastic, it's fantastic\nYou can brush my hair, undress me everywhere\nImagination, life is your creation\nI should see this but I'm not`}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  pendingButton: {
    backgroundColor: '#D9D9D9',
  },

  pendingText: {
    color: '#B5B5B5',
  },

  plantImage: {
    width: 430,
    height: 430,
  },

  plantInfoContainer: {
    marginTop: 16,
    padding: 17,
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  plantNameWithHeart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  heart: {
    marginRight: 10,
  },

  title: {
    fontSize: 21,
    fontWeight: 'bold',
  }
});

export default PlantDescription;