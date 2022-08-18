import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableWithoutFeedback } from 'react-native';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { usePlant } from '../../TabNavigator.js';

const MyFavoritesHome = () => {

  const [favoritesList, setFavoritesList] = useState([]);
  const {userIdentity} = usePlant();
  const userID = userIdentity[0];

  useEffect(() => {
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites?user_id=${userID}`)
      .then((results) => {
        //console.log(results.data, 'this is the result from useeffect')
        setFavoritesList(results.data)

      })
      console.log(userIdentity, 'user identiy');
      console.log(userID, 'user ID')
  }, []);

  const renderPlants = ({ item }) => (
    <View style={styles.plantInformationContainer}>
      <View style={styles.leftPart}>
        <Image source={{ url: item.photo }} style={styles.plantImage} />
      </View>
      <View style={styles.item}>
        <View style={styles.plantInfoWithHeartButton}>
          <View>
            <View style={styles.plantName}>
              <Text style={styles.title}>{item.plant_name}</Text>
            </View>
            <View>
              <Text style={styles.otherPlantInfo}>{item.zip}</Text>
              <Text style={styles.otherPlantInfo}>{item.distance} plz not miles</Text>
              <Text style={styles.otherPlantInfo}>{item.username}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => { deleteFavorite(item.plant_id) }}>
            <Ionicons name="heart" style={styles.heart} size={25} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const deleteFavorite = (id) => { //delete favorites functionality here
    let tempArray = favoritesList.slice();
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].plant_id === id) {
        console.log(tempArray[i], 'plant information') //should log deleted plant information
        let favoriteId = tempArray[i].favorites_id;
        console.log(favoriteId, ' favorites id')
        tempArray.splice(i, 1);
        setFavoritesList(tempArray)
        axios.delete(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites?favorites_id=${favoriteId}`)
      }

    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Title style= {styles.headerTitle}> My Favorites</Title> */}
      <FlatList
        data={favoritesList}
        renderItem={renderPlants}
        contentContainerStyle={{ paddingBottom: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: 'center',
    width: "100%"
  },

  plantInformationContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 10
  },

  item: {
    flex: 1,
    backgroundColor: '#CED89E',
    paddingHorizontal: 15,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'space-around',
  },

  plantInfoWithHeartButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  heart: {
    color: 'red',
  },

  plantImage: {
    width: 100,
    height: 125,
    padding: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  otherPlantInfo: {
    marginTop: 5
  },

  plantInformation: {
    display: 'flex',
  },

  plantName: {
    display: 'flex',
    justifyContent: 'right',
  }
});

export default MyFavoritesHome;