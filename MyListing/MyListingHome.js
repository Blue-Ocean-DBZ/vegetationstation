import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable, Image } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

import AddPlantModal from './AddPlantModal.js'

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
        <ScrollView>
          <Card>
            <View style= {styles.plantCardContainer}>
              <Card.Cover style= {styles.plantImage} source= {{url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*'}} />
              <View style= {styles.plantCardInformation}>
                <Title style= {styles.plantName}>Plant Name</Title>
                <Paragraph>Location (XXXX mi away)</Paragraph>
                <Paragraph>Username</Paragraph>
              </View>
            </View>
          </Card>

          <Card>
            <View style= {styles.plantCardContainer}>
              <Card.Cover style= {styles.plantImage} source= {{url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376'}} />
              <View style= {styles.plantCardInformation}>
                <Title style= {styles.plantName}>Plant Name</Title>
                <Paragraph>Location (XXXX mi away)</Paragraph>
                <Paragraph>Username</Paragraph>
              </View>
            </View>
          </Card>
        </ScrollView>
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