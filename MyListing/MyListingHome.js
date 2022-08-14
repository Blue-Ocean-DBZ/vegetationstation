import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image, FlatList } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const DATA = [
  {
    name: 'PlantOne',
    owner: 'Brandon',
    location: 'LA',
    distance: '12 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantTwo',
    owner: 'Andrew',
    location: 'SF',
    distance: '312 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
];

const MyListingHome = () => {

  const [displayModal, setDisplayModal] = useState(false);
  const [imagePath, setImagePath] = useState();

  const handleAddPlant = () => {
    setDisplayModal(true);
  }

  const selectPicture = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted != true) {
      alert('We need permissions to acess your photo library')
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync();
    if(!result.cancelled) {
      setImagePath(result.uri)
    }
  }

  const takePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted != true) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    setImagePath(result.uri)
  }

  const closeModal = () => {
    setDisplayModal(!displayModal);
    setImagePath();
  }

  const uploadPhoto = () => {
    setDisplayModal(!displayModal);
    setImagePath();
  }

  const renderPlants = ({ item }) => (
    <View style= {styles.plantInformationContainer}>
      <View >
        <Image source= {{url: item.url}} style= {styles.plantImage}/>
      </View>
      <View style={styles.item}>
        <View style={styles.plantName}>
          <Text style= {styles.title}>{item.name}</Text>
        </View>
        <View>
          <Text style= {styles.otherPlantInfo}>{item.location} {item.distance}</Text>
          <Text style= {styles.otherPlantInfo}>{item.owner}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <View style= {styles.addPlantModalContainer}>
        <Modal
          animationType= 'slide'
          visible= {displayModal}
          presentationStyle= 'fullscreen'
          onRequestClose= {()=> {setDisplayModal(!displayModal);}}>
            <View style= {styles.addPlantModalContainer}>
              <Image source= {{uri: imagePath}} style= {styles.image} />
              <View style= {styles.buttonLayoutPhotos}>
                <Button onPress= {selectPicture}> Choose from Gallery</Button>
                <Button onPress= {takePicture}>Take Picture</Button>
              </View>
              <View style= {styles.buttonLayoutPhotos}>
                <Button onPress= {closeModal}>Upload</Button>
                <Button onPress= {closeModal}>Close</Button>
              </View>
            </View>
          </Modal>
      </View>

      <View style= {styles.overallContainer}>
        <View style= {styles.header}>
          <Title style= {styles.headerTitle}>My Listings</Title>
          <TouchableOpacity
            onPress= {handleAddPlant}>
            <Text>Pick a Plant</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={DATA}
          renderItem={renderPlants}
        />
      </View>
    </View>
  )
}

export default MyListingHome;

const styles= StyleSheet.create({
  overallContainer: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
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

  plantInformationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 40,
    width: '80%',
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },

  item: {
    backgroundColor: '#CED89E',
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },

  plantImage: {
    width: 100,
    height: 100,
    padding: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius:20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  otherPlantInfo: {
    marginTop: 5.
  },

  plantInformation: {
    display: 'flex',
  },

  plantName: {
    display: 'flex',
    justifyContent: 'right',
  },
})