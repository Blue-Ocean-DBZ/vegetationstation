import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image, FlatList, SafeAreaView, TouchableWithoutFeedback, RefreshControl } from 'react-native';
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
import ProfilePic from './Auth/placeholder/gui.png'

const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [refresh, setRefresh] = useState(false)
  const [filteredList, setFilteredList] = useState([]);
  const [dummyData, setDummyData] = useState([]);
  const {userIdentity, userZipcode, userProfilePicture, plantList, fetchData } = usePlant();
  const [id, setId] = userIdentity;
  const [zip, setZip] = userZipcode;
  const [profilePic, setProfilePic] = userProfilePicture;
  const [favoritesList, setFavoritesList] = useState();
  const [plantArray, setPlantArray] = plantList;
  const [image, setImage] = useState(auth.currentUser?.photoURL || 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg')


  const navigate = useNavigation()

  useEffect( () => {
    let updateHome = async () => {
      console.log('USE EFFECT HOME')
      await setPlantArray[plantList]
    }
    updateHome();
    console.log('NEW PLANTS ARRAY', plantArray)
  }, [plantList])

  const onChangeSearch = query => {
    setSearchTerm(query);
    let filteredListing = [];
    if (query) {
      const regex = new RegExp(`^/${query}/`, 'i');
      filteredListing = plantArray.filter(v =>
        v.plant_name.toLowerCase().includes(query.toLowerCase())
      )
      setFilteredList(filteredListing);
    } else {
      setFilteredList([]);
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

  const onRefresh = async () => {
    setRefresh(true)
    await fetchData()
    setRefresh(false)
  }


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
      <View style={styles.plantsWrapper}>
      {/* This is the conditional for filtering with the searchbar */}
        {filteredList.length === 0 && searchTerm.length === 0 ?
          <FlatList
          data={plantArray}
          renderItem={(props)=> <PlantCard {...props} navigate={navigate}/>}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 350 }}
          onRefresh={() => onRefresh()}
          refreshing={refresh}/>
          : filteredList.length > 0 ? <FlatList data={filteredList} renderItem={(props)=> <PlantCard {...props} navigate={navigate}/>}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 350 }}/>
          : null
          }
      </View>
    </View>
  )
}

export default Home;

const styles= StyleSheet.create({
  overallContainer: {
    paddingVertical: 50,
    paddingRight: 10,
    paddingLeft: 10,
    height: 500,
    width: 'auto',
    backgroundColor: '#F2F2F2'
  },

  searchBar: {
    backgroundColor: '#F2F2F2',
  },

  searchBarContainer: {
    backgroundColor: '#F2F2F2',
   },

  searchInputContainer: {
    backgroundColor: '#F2F2F2',
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
    justifyContent: 'space-between'
  },

  headerTitle: {
    paddingTop: '6%',
    paddingLeft: 20,
    paddingBottom: 7
  },

  plantsWrapper: {
    marginTop: 20,
    height: '100%',
    paddingLeft: 5,
    paddingRight: 5,
  }
});