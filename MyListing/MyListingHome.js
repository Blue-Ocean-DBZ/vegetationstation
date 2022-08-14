import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, Pressable, Image, FlatList } from 'react-native';
import { Button, Title } from 'react-native-paper';
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
    owner: 'Shannon',
    location: 'SF',
    distance: '312 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    name: 'PlantThree',
    owner: 'Carson',
    location: 'OC',
    distance: '24 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantFour',
    owner: 'Gian',
    location: 'Stockton',
    distance: '246 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    name: 'PlantFive',
    owner: 'Jonathan',
    location: 'LA',
    distance: '12 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantSix',
    owner: 'David',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },{
    name: 'PlantSeven',
    owner: 'Kevin',
    location: 'Cupertino',
    distance: '246 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
  {
    name: 'PlantEight',
    owner: 'Theresa',
    location: 'OC',
    distance: '12 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantNine',
    owner: 'Clayton',
    location: 'Sacramento',
    distance: '442 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
];

const MyListingHome = () => {

  const addPicImage = 'https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png';
  const addPlantImage = 'https://cdn2.iconfinder.com/data/icons/plant-care-1/256/fertilize-512.png';

  const [displayModal, setDisplayModal] = useState(false);
  const [imagePath, setImagePath] = useState(addPicImage);

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
    setImagePath(addPicImage);
  }

  const uploadPhoto = () => {
    setDisplayModal(!displayModal);
    setImagePath(addPicImage);
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
    <SafeAreaView style= {styles.container}>
      <View style= {styles.addPlantModalContainer}>
        <Modal
          animationType= 'slide'
          visible= {displayModal}
          presentationStyle= 'fullscreen'
          onRequestClose= {()=> {setDisplayModal(!displayModal);}}>

            <View style= {styles.addPlantModalContainer}>
              <View style= {{marginLeft:257}}>
                <Button onPress= {closeModal}>Close</Button>
              </View>
              <Image source= {{uri: imagePath}} style= {styles.image} />
              <View style= {styles.buttonLayoutPhotos}>
                <Button onPress= {selectPicture}> Choose from Gallery</Button>
                <Button onPress= {takePicture}>Take Picture</Button>
              </View>
              <View style= {styles.buttonLayoutPhotos}>
                {(imagePath != addPicImage) && imagePath ? <Button onPress= {closeModal}>Upload</Button> : null}
              </View>
            </View>
          </Modal>
      </View>

      <View style= {styles.header}>
        <Title style= {styles.headerTitle}>My Listings</Title>
        <TouchableOpacity
          onPress= {handleAddPlant}>
          <Image style= {styles.headerAddPlant} source= {{url: addPlantImage}}/>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={DATA}
          renderItem={renderPlants}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyListingHome;

const styles= StyleSheet.create({

  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 700,
  },

  addPlantModalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 300,
    height: 300,
  },

  buttonLayoutPhotos: {
    display: 'flex',
    flexDirection: 'row',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 20,
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

  headerAddPlant: {
    width: 30,
    height: 30,
  },

  item: {
    backgroundColor: '#CED89E',
    paddingLeft: 10,
    paddingTop: 25,
    paddingBottom: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: 'space-around',
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