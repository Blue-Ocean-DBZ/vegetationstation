import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import PlantCard from './PlantCard.js';
import { auth } from '../../firebase.js';
import OpenModal from '../Trades/TradeModal/OpenModal.js'

let dummyData = {
  pending: true,
  plant_id: 183916,
  name: 'PlantSix',
  owner: 'David',
  location: 'Sacramento',
  distance: '442 mi away',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
  profile_pic: auth.currentUser?.photoURL,
};


// need to grab props of selected plant somehow
const PlantDescription = () => {
  console.log('in plant description')

  const [plantListing, setPlantListing] = useState(dummyData);
  const [fillHeart, setFillHeart] = useState('red');
  const [showModal, setShowModal] = useState(false);

  // not changing colors
  const toggleFavorite = () => {
    fillHeart === 'red' ? setFillHeart('white') : setFillHeart('red');
  };

  // show modal
  const _onTradeButton = () => {
    setShowModal(true);
  }

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{ url: plantListing.url }}
          style={styles.plantImage}>
        </Image>
        <View style={styles.plantInfoContainer}>
          <View>
            <View style={styles.plantNameWithHeart}>
              <Text style={styles.title}>{dummyData.name}</Text>
              <TouchableWithoutFeedback onPress={() => {toggleFavorite()}}>
                <Fontisto name="heart" size={27} color={fillHeart} style={styles.heart} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.detail}>{`${plantListing.location} (${plantListing.distance})`}</Text>
            <Text style={styles.detail}>{`Owner: ${plantListing.owner}`}</Text>
          </View>
          <View>
            <Text style={styles.title}>Status:</Text>
            <Text style={styles.detail}>{plantListing.pending ? `-PENDING-` : `-AVAILABLE-`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => _onTradeButton()}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>{plantListing.pending ? 'Trade pending' : 'Trade'}</Text>
              </View>
            </TouchableOpacity>
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

  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },

  button: {
    height: 60,
    width: 350,
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    fontColor: 'white'
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