import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableWithoutFeedback } from 'react-native';
import { Title } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

let DATA = [
  {
    id: 1,
    name: 'PlantOne',
    owner: 'Brandon',
    location: 'LA',
    distance: '12 mi away',
    favorite: true,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    id: 2,
    name: 'PlantTwo',
    owner: 'Shannon',
    location: 'SF',
    distance: '312 mi away',
    favorite: true,
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    id: 3,
    name: 'PlantThree',
    owner: 'Carson',
    location: 'OC',
    distance: '24 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmF6j-VfIy1CwkaCi4L_YJH5hl1qGsufLD4A&usqp=CAU',
  },
  {
    id: 4,
    name: 'PlantFour',
    owner: 'Gian',
    location: 'Stockton',
    distance: '246 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIHw3oUEi2EAMDD6AHDe2j37Y2JuEozh6tg&usqp=CAU',
  },
  {
    id: 5,
    name: 'PlantFive',
    owner: 'Jonathan',
    location: 'LA',
    distance: '12 mi away',
    favorite: true,
    url: 'https://empire-s3-production.bobvila.com/slides/30451/original/Gloxinia-flowering-houseplants.jpg?1551987245',
  },
  {
    id: 6,
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
  },
  {
    id: 7,
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJi4K4-eM57BhLUM8dOqS5PV0FZUN-2usMw&usqp=CAU',
  },
  {
    id: 8,
    name: 'PlantEight',
    owner: 'Theresa',
    location: 'OC',
    distance: '12 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowhGAXIPf4gl8Tp1sQF9_zgxP8Xx36mBFTA&usqp=CAU',
  },
  {
    id: 9,
    name: 'PlantNine',
    owner: 'Clayton',
    location: 'Sacramento',
    distance: '442 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCTPKnYjEN3XdLC7PMgo9qViE-4-VK-JvKw&usqp=CAU',
  },
];

const MyFavoritesHome = () => {

  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/favorites?user_id=3')
      .then((results) => {
        console.log(results.data, 'this is the result from useeffect')
        setFavoritesList(results.data)
      })
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