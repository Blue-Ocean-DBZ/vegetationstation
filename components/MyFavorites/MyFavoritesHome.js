import React, { useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableWithoutFeedback } from 'react-native';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

const MyFavoritesHome = () => {

  const [favoritesList, setFavoritesList] = useState(DATA);

  const renderPlants = ({ item }) => (
    <View style={styles.plantInformationContainer}>
      <View style={styles.leftPart}>
        <Image source={{ url: item.url }} style={styles.plantImage} />
      </View>
      <View style={styles.item}>
        <View style={styles.plantInfoWithHeartButton}>
          <View>
            <View style={styles.plantName}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.otherPlantInfo}>{item.location}</Text>
              <Text style={styles.otherPlantInfo}>{item.distance}</Text>
              <Text style={styles.otherPlantInfo}>{item.owner}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress={() => { deleteFavorite(item.url) }}>
            <Ionicons name="heart" style={styles.heart} size={25} />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const deleteFavorite = (id) => { //delete favorites functionality here
    let tempArray = favoritesList.slice();
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].url === url) {
        console.log(tempArray[i], 'plant information') //should log deleted plant information
        tempArray.splice(i, 1);
        setFavoritesList(tempArray)
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