import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import PlantCard from './PlantCard.js';
import { auth } from '../../firebase.js';
import OpenModal from '../Trades/TradeModal/OpenModal.js'

let dummyData = [
  {
    pending: true,
    plant_id: 183916,
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
    profile_pic: auth.currentUser?.photoURL,
  }
];

// need to grab props of selected plant somehow
const PlantDescription = () => {
  const [plantListing, setPlantListing] = useState(dummyData);
  const [fillHeart, setFillHeart] = useState('red');
  const [showModal, setShowModal] = useState(false)

  // not changing colors
  const toggleFavorite = () => {
    fillHeart === 'red' ? setFillHeart('white') : setFillHeart('red');
  };

  const _onPressButton = () => {
    setShowModal(true);
  }

  return (
    <View>
      <View>

        <TouchableOpacity onPress={() => _onPressButton()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Trade</Text>
          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.container}>
        <Image
          source={{ url: plantListing[0].url }}
          style={styles.plantImage}>
        </Image>
        <View style={styles.plantInfoContainer}>
          <View>
            <View style={styles.plantNameWithHeart}>
              <Text style={styles.title}>{plantListing[0].name}</Text>
              <TouchableWithoutFeedback onPress={() => {toggleFavorite()}}>
                <Fontisto name="heart" size={27} color={fillHeart} style={styles.heart} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.detail}>{`${plantListing[0].location} (${plantListing[0].distance})`}</Text>
            <Text style={styles.detail}>{`Owner: ${plantListing[0].owner}`}</Text>
          </View>
          <View>
            <Text style={styles.title}>Status:</Text>
            <Text style={styles.detail}>{plantListing[0].pending ? `-PENDING-` : `-AVAILABLE-`}</Text>
          </View>
        </View>
      </View>
      {showModal && <OpenModal />}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 650,
    flex: 1,
    backgroundColor: '#fff',
  },

  button: {
    height: 38,
  },

  buttonText: {
    color: 'black'
  },

  plantImage: {
    width: 430,
    height: 430,
  },

  // justify contents not working
  plantInfoContainer: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 21,
  },

  plantNameWithHeart: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  heart: {
    marginTop: 13,
    marginRight: 10,
    borderColor: 'black'
  },

  title: {
    marginTop: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },

  detail: {
    marginTop: 8,
    fontSize: 20,
  }

});

export default PlantDescription;