import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image, FlatList, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/core'
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FontAwesome, Ionicons} from 'react-native-vector-icons'
import { SearchBar } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../firebase.js'
import { usePlant } from '../TabNavigator.js';
import PlantCard from './Plants/PlantCard.js';


let _data = [
  {
    pending: true,
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
    profile_pic: auth.currentUser?.photoURL,
  },
  {
    pending: false,
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJi4K4-eM57BhLUM8dOqS5PV0FZUN-2usMw&usqp=CAU',
    profile_pic: auth.currentUser?.photoURL,
  },
];

const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  // const {userIdentity, userZipcode, userProfilePicture, plantList} = usePlant();
  // const [id, setId] = userIdentity;
  // const [zip, setZip] = userZipcode;
  // const [profilePic, setProfilePic] = userProfilePicture;
  const [favoritesList, setFavoritesList] = useState(DATA);
  // const [plantArray, setPlantArray] = plantList;
  const [image, setImage] = useState(auth.currentUser?.photoURL || 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg')

  const navigate = useNavigation()

  const onChangeSearch = query => {
    setSearchTerm(query);
    let filteredListing = [];
    if (query) {
      const regex = new RegExp(`^${query}`, 'i');
      filteredListing = DATA.filter(v => regex.test(v.name))
      setFilteredList(filteredListing);
    } else {
      setFilteredList([]);
    }
  }

  const renderSuggestions = () => {
    if(data.length === 0) {
      return null
    } else {
      // FOR LATER data={suggestions}
        return (
          <FlatList>
            data={DATA}
            renderItem={renderCard}
            keyExtractor={item => item.id}
          </FlatList>
        )
    }
  }

  const deleteFavorite = (url) => { //delete favorites functionality here
    let tempArray = favoritesList.slice();
    for (let i = 0; i < tempArray.length; i++){
      if (tempArray[i].url === url) {
        console.log (tempArray[i], 'plant information') //should log deleted plant information
        tempArray.splice(i, 1);
        setFavoritesList(tempArray)
      }
    }
  };


  const renderCard = ({item}) => (
    <Card>
      <View style= {styles.plantCardContainer}>
        <View>
          <Image source= {{url: item.url}} style= {styles.plantImage}/>
        </View>
        <View style= {styles.item}>
          <View style= {styles.plantInfoWithHeartButton}>
            <View>
              <View>
                <Text style= {styles.plantName}>{item.name}</Text>
              </View>
              <View>
                <Text style= {styles.otherPlantInfo}>{item.location}, {item.distance}</Text>
                <Text style= {styles.otherPlantInfo}>{item.owner}</Text>
              </View>
            </View>
            <TouchableWithoutFeedback onPress= {() => {deleteFavorite(item.url)}}>
              <Ionicons name="heart" style= {styles.heart} size= {25}/>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Card>
  )

  return (
    <View styles={styles.searchBar}>
      <View style={styles.homeHeader}>
        <Title style={styles.headerTitle}>Vegetation Station</Title>
        <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Profile")}>
          <Image style={styles.profileImage} source={{uri: image}}/>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.searchBarContainer}>
          <SearchBar inputStyle={styles.searchBar}
            containerStyle={styles.searchInputContainer}
            inputContainerStyle={styles.searchBar} placeholder="search plants" onChangeText={onChangeSearch} value={searchTerm}   placeholderTextColor={'#g5g5g5'}
          />
      </View>
      {/* <View style={styles.overallContainer}>
        <View style={styles.header}>
        </View>
        <SafeAreaView>
          {filteredList.length > 0 ? <FlatList data={filteredList} renderItem={renderCard}/>
          : searchTerm ? <FlatList data={filteredList} renderItem={renderCard}/>
          : <FlatList data={DATA} renderItem={renderCard}/>}

        </SafeAreaView>
      </View> */}
      <View style={styles.plantsWrapper}>
        <FlatList
          data={DATA}
          renderItem={(props)=> <PlantCard {...props} navigate={navigate}/>}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 350 }}
        />
      </View>
    </View>
  )
}

export default Home;

const DATA = [
  {
    name: 'PlantOne',
    owner: 'Brandon',
    location: 'LA',
    distance: '12 mi away',
    favorite: true,
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantTwo',
    owner: 'Shannon',
    location: 'SF',
    distance: '312 mi away',
    favorite: true,
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    name: 'PlantThree',
    owner: 'Carson',
    location: 'OC',
    distance: '24 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmF6j-VfIy1CwkaCi4L_YJH5hl1qGsufLD4A&usqp=CAU',
  },
  {
    name: 'PlantFour',
    owner: 'Gian',
    location: 'Stockton',
    distance: '246 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbIHw3oUEi2EAMDD6AHDe2j37Y2JuEozh6tg&usqp=CAU',
  },
  {
    name: 'PlantFive',
    owner: 'Jonathan',
    location: 'LA',
    distance: '12 mi away',
    favorite: true,
    url: 'https://empire-s3-production.bobvila.com/slides/30451/original/Gloxinia-flowering-houseplants.jpg?1551987245',
  },
  {
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9HZXoUNWkyvVOQhBOKI6Te9WAEjL35peDcA&usqp=CAU',
  },{
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoJi4K4-eM57BhLUM8dOqS5PV0FZUN-2usMw&usqp=CAU',
  },
  {
    name: 'PlantEight',
    owner: 'Theresa',
    location: 'OC',
    distance: '12 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRowhGAXIPf4gl8Tp1sQF9_zgxP8Xx36mBFTA&usqp=CAU',
  },
  {
    name: 'PlantNine',
    owner: 'Clayton',
    location: 'Sacramento',
    distance: '442 mi away',
    favorite: true,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwCTPKnYjEN3XdLC7PMgo9qViE-4-VK-JvKw&usqp=CAU',
  },
];


const styles= StyleSheet.create({
  overallContainer: {
    paddingVertical: 50,
    paddingRight: 10,
    paddingLeft: 10,
    height: 500,
    width: 'auto',
    backgroundColor: 'white'
  },

  searchBar: {
    backgroundColor: 'white',
  },

  searchBarContainer: {
    backgroundColor: 'white',
   },

  searchInputContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 15,
    marginHorizontal: 20,
  },

  plantInformation: {
    display: 'flex',
  },

  plantName: {
    display: 'flex',
    justifyContent: 'right',
    marginBottom: 0,
    fontSize: 16,
    fontWeight: 'bold'
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: '50%',
    top: 14,
    right: 14
  },

  homeHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20
  },

  plantsWrapper: {
    marginTop: 20,
    height: "100%"
  }
})