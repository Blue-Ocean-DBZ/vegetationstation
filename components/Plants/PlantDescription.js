import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import {FontAwesome, Ionicons} from 'react-native-vector-icons'
import PlantCard from './PlantCard.js';
import { auth } from '../../firebase.js';
import TradeModal from '../Trades/TradeModal/TradeModal.js'

const PlantDescription = ({ route }) => {
  const plant = route.params;
  const [fillHeart, setFillHeart] = useState('red');
  const [modalVisible, setModalVisible] = useState(false);
  const [favorites, setFavorites] = useState(null);
  // useEffect()

  const toggleFavorite = () => {

    if (fillHeart === 'red') {
      setFillHeart('white');
    } else {
      setFillHeart('red');
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  }

  return (
    <View>
      <View style={styles.container}>
        <Image
          source={{ url: plant.photo }}
          style={styles.plantImage}>
        </Image>
        <View style={styles.plantInfoContainer}>
          <View>
            <View style={styles.plantNameWithHeart}>
              <Text style={styles.title}>{plant.plant_name}</Text>
              <TouchableWithoutFeedback onPress={() => {toggleFavorite()}}>
                <Ionicons
                name="heart"
                style= {styles.heart}
                color={fillHeart}
                size= {30}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.detail}>{`${plant.location} (${Math.floor(plant.distance / 1609)} miles away)`}</Text>
            <Text style={styles.detail}>{`Owner: ${plant.username}`}</Text>
          </View>
          <View>
            <Text style={styles.title}>Status:</Text>
            <Text style={styles.detail}>{plant.pending ? `-PENDING-` : `-AVAILABLE-`}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disable={plant.pending}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.button}>
                <Text style={styles.buttonText}>{plant.pending ? 'Trade pending' : 'Trade'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TradeModal selectedPlant={plant.plant_id} closeModal={closeModal}/>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 800,
  },

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 40,
  },

  button: {
    height: 60,
    width: 350,
    backgroundColor: '#2C3D36',
    borderColor: '#2C3D36',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'whitesmoke',
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
    marginTop: 7,
    marginRight: 7,
    borderColor: 'black'
  },

  title: {
    marginTop: 10,
    fontSize: 25,
    fontWeight: 'bold',
  },

  detail: {
    marginTop: 8,
    fontSize: 18,
  },

  centeredView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

});

export default PlantDescription;