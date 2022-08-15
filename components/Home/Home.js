import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image, FlatList, SafeAreaView} from 'react-native';
import { Button, Card, Title, Paragraph, Searchbar } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const Home = (props) => {

  const [searchTerm, setSearchTerm] = useState('');
  const [plantsList, setPlantsList] = useState([]);

  const onChangeSearch = query => {
    setSearchTerm(query);
    let filteredListing = [];

    if (query.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      filteredListing = plantsList.sort().filter(v => regex.test(v.name))
      setPlantsList(filteredListing);
    }
  }

  const renderSuggestions = () => {
    if(data.length === 0) {
      return null
    } else {
      //            data={suggestions}
        const renderCard = ({plant}) => (
          <Card>
            <View style= {styles.plantCardContainer}>
              <Card.Cover style= {styles.plantImage} source= {{url: plant.img}} />
              <View style= {styles.plantCardInformation}>
                <Title style= {styles.plantName}>{plant.name}</Title>
                <Paragraph>{plant.location} (XXXX mi away)</Paragraph>
                <Paragraph>{plant.username}</Paragraph>
              </View>
            </View>
          </Card>
        )
        return (
          <FlatList>
            data={fakeData}
            renderItem={renderCard}
            keyExtractor={item => item.id}
          </FlatList>
        )
    }

  }

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
    name: "Plantlord5",
    img: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
    username: 'Test',
    location: 'Denmark'
  }
]

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
    <View>
      <Searchbar placeholder="Search plants" onChangeText={onChangeSearch} value={searchTerm}/>
      <View style= {styles.overallContainer}>
        <View style= {styles.header}>
          <Title style= {styles.headerTitle}>Listings</Title>
        </View>
        <SafeAreaView>
            <FlatList
              data={DATA}
              renderItem={renderCard}
            />
        </SafeAreaView>
      </View>
    </View>
  )
}

export default Home;

const styles= StyleSheet.create({
  overallContainer: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
    height: 500,
    width: 'auto',
  },

  addPlantModalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 300,
    height: 300,
    backgroundColor: 'grey',
  },

  buttonLayoutPhotos: {
    display: 'flex',
    flexDirection: 'row',
  },

  header: {
    display: 'fles',
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
    marginBottom: 10,
  },

  plantImage: {
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