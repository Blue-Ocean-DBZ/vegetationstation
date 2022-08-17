import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import PlantCard from './PlantCard.js';
import ProfilePic from './../Auth/placeholder/gui.png';

let dummyData = [
  {
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
    profile_pic: ProfilePic,
  },
  {
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJi4K4-eM57BhLUM8dOqS5PV0FZUN-2usMw&usqp=CAU',
    profile_pic: ProfilePic,
  },
];

// once a plant card is click
// potentially add description
const PlantDescription = () => {
  const [plantListing, setPlantListing] = useState(dummyData);
  const [requestTrade, setRequestTrade] = useState(false);
  const [fillHeart, setFillHeart] = useState('red');

  // set back to false?????
  const _onTradeButton = () => {
    setRequestTrade(true);
  }

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
        {/* <View>
          <Text style={styles.title}>Description:</Text>
          <Text>{`I'm a Barbie girl, in the Barbie world\nLife in plastic, it's fantastic\nYou can brush my hair, undress me everywhere\nImagination, life is your creation\nI should see this but I'm not`}</Text>
        </View> */}
      </View>

      <FlatList
        data={dummyData}
        renderItem={PlantCard}
      />

    </View>
  )
};

const styles = StyleSheet.create({
  // pendingButton: {
  //   backgroundColor: '#D9D9D9',
  // },

  // pendingText: {
  //   color: '#B5B5B5',
  // },
  container: {
    height: 650,
    flex: 1,
    backgroundColor: '#fff',
  },

  plantImage: {
    width: 430,
    height: 430,
  },

  // justify contents not working
  plantInfoContainer: {
    marginTop: 16,
    padding: 17,
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
    borderColor: 'black'
  },

  title: {
    fontSize: 21,
    fontWeight: 'bold',
  }
});

export default PlantDescription;