import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, StyleSheet, FlatList, Text, View, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { FontAwesome, Ionicons } from 'react-native-vector-icons'
import { auth } from '../../firebase.js';
import { usePlant } from '../../TabNavigator.js';
import PlantCard from './PlantCard.js';
import TradeModal from '../Trades/TradeModal/TradeModal.js'

const PlantDescription = ({ route }) => {
  const plant = route.params;
  // fix this bc its always white
  const [fillHeart, setFillHeart] = useState('white');
  const [modalVisible, setModalVisible] = useState(false);
  const [favoriteID, setFavoriteID] = useState([]);
  const {userIdentity} = usePlant();
  const userID = userIdentity[0];
  console.log(userID)

  useEffect(() => {
    // get favorites
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites?user_id=${userID}`)

    // iterate over data
    .then((results) => {
      console.log('in line 27 results >>>>>', results.data)
      if (results.data.length !== 0) {
        results.data.forEach((favorite) => {
          // if exists
          if ( favorite.plant_id === plant.plant_id ) {
            // set the heart to red
            setFillHeart('red');
            // save favorite_id
            return favorite.favorite_id;
          }
        });
      }
    })
    .then((id) => {
      setFavoriteID(id);
    })
    .catch((err) => {
      console.log('error getting all fav');
    });
  }, []);


  const toggleFavorite = () => {
    // if it is a favoriteID exists
    if (fillHeart === 'red') {
      // call axios delete
      axios.delete(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites?favorites_id=${favoriteID}`)
        //then set to white
        .then((results) => {
          console.log('success removing from favorites')
          setFillHeart('white');
        })
        .catch((err) => {
          console.log('error deleting from favorites')
        })

    // otherwise,
    } else {
      // make an axios post call with user_id and plant_id
      axios.post(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites`, {
        user_id: userID,
        plant_id: plant.plant_id
      })
        // then set heart to red
        .then((results) => {
          setFillHeart('red');
        })
        .catch((err) => {
          console.log('error adding to favorites')
        });
    };
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
            <Text style={styles.detail}>{`${plant.city} (${Math.floor(plant.distance / 1609)} miles away)`}</Text>
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