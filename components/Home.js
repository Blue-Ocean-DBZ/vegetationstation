import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image, FlatList, SafeAreaView} from 'react-native';
import { Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import {FontAwesome} from 'react-native-vector-icons'
import * as ImagePicker from 'expo-image-picker';

const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);
  const [dummyData, setDummyData] = useState([]);

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
            data={fakeData}
            renderItem={renderCard}
            keyExtractor={item => item.id}
          </FlatList>
        )
    }

  }


const renderCard = ({item}) => (
  <Card>
    <View style= {styles.plantCardContainer}>
      <Card.Cover style= {styles.plantImage} source= {{url: item.img}} />
      <View style= {styles.plantCardInformation}>
        <Title style= {styles.plantName}>{item.name}</Title>
        <Paragraph>{item.location} (XXXX mi away)</Paragraph>
        <Paragraph>{item.username}</Paragraph>
      </View>
    </View>
  </Card>
)
  return (
    <View styles={{backgroundColor: 'white'}}>
      <Searchbar placeholder="search plants" inputStyle={styles.searchBar} containerStyle={styles.searchBarContainer} onChangeText={onChangeSearch} value={searchTerm} searchIcon={FontAwesome.search} placeholderTextColor={'#g5g5g5'}  inputContainerStyle={{backgroundColor: 'white'}}
      />
      <View style={styles.overallContainer}>
        <View style={styles.header}>
          <Title style= {styles.headerTitle}>Listings</Title>
        </View>
        <SafeAreaView>
          {filteredList.length > 0 ? <FlatList data={filteredList} renderItem={renderCard}/>
          : searchTerm ? <FlatList data={filteredList} renderItem={renderCard}/>
          : <FlatList data={DATA} renderItem={renderCard}/>}

        </SafeAreaView>
      </View>
    </View>
  )
}

export default Home;

const DATA = [
  {
  name: "Plantlord",
  img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  username: 'Test',
  location: 'Denmark'
},
{
  name: "Plantlord2",
  img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  username: 'Test',
  location: 'Denmark'
},
{
  name: "Plantlord3",
  img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  username: 'Test',
  location: 'Denmark'
},
{
  name: "Plantlord4",
  img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  username: 'Test',
  location: 'Denmark'
},
{
  name: "A apple",
  img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  username: 'Test',
  location: 'Denmark'
}
]

const styles= StyleSheet.create({
  overallContainer: {
    paddingVertical: 50,
    marginRight: 10,
    marginLeft: 10,
    height: 500,
    width: 'auto',
    backgroundColor: 'white'
  },

  searchBar: {
    backgroundColor: 'white'
  },

  searchBarContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5
   },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 25,
  },

  plantCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#B2B2B2',
    borderRadius: 10
  },

  plantImage: {
    position: 'relative',
    paddingLeft: 10,
    backgroundColor: '#B2B2B2',
    width: 100,
    height: 100,
  },

  plantCardInformation: {
    marginLeft: 15,
  },

  plantName: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
  }
})