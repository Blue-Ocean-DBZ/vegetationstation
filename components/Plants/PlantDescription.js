import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Modal, StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import {FontAwesome, Ionicons} from 'react-native-vector-icons'
import PlantCard from './PlantCard.js';
import { auth } from '../../firebase.js';
import TradeModal from '../Trades/TradeModal/TradeModal.js'

const PlantDescription = ({ route }) => {
  const plant = route.params;

  const [fillHeart, setFillHeart] = useState('red');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleFavorite = () => {
    fillHeart === 'red' ? setFillHeart('white') : setFillHeart('red');
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
                size= {25}
                />
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.detail}>{`${plant.location} (${plant.distance})`}</Text>
            <Text style={styles.detail}>{`Owner: ${plant.owner}`}</Text>
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
                <TradeModal selectedPlant={dummyData[0].plant_id} closeModal={closeModal}/>
              </View>
            </View>
          </Modal>
        </View>
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
    backgroundColor: 'white',
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