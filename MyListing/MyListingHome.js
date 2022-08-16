import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, Pressable, Image, FlatList, TextInput, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth, signOutUser } from '../firebase.js'

let DATA = [
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

const MyListingHome = () => {

  const addPicImage = 'https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png';
  const addPlantImage = 'https://cdn2.iconfinder.com/data/icons/plant-care-1/256/fertilize-512.png';

  const [displayModal, setDisplayModal] = useState(false);
  const [imagePath, setImagePath] = useState(addPicImage);
  const [addPlantName, setAddPlantName] = useState('');
  const [favoritesList, setFavoritesList] = useState(DATA);
  const [showConfirmation, setShowConfirmation] = useState(true);

  const handleAddPlant = () => {
    setDisplayModal(true);
  };

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
  };

  const takePicture = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted != true) {
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    setImagePath(result.uri)
  };

  const closeModal = () => {
    setDisplayModal(!displayModal);
    setImagePath(addPicImage);
    setAddPlantName('')
  };

  const uploadPhoto = async () => { //addPlant functionality here
    console.log(addPlantName) // plant name
    setDisplayModal(!displayModal);
    const res = await fetch(imagePath)
    const blob = await res.blob()
    const filename =  imagePath.substring(imagePath.lastIndexOf('/') + 1)

    const imageRef = ref(storage, filename)
    uploadBytes(imageRef, blob)
      .then(snapshot => {
        const uri = `https://firebasestorage.googleapis.com/v0/b/vegetationstation1.appspot.com/o/${filename}?alt=media` // url we get back from firebase
        console.log(uri);
      })
      .catch(err => console.log(err))
    setImagePath(addPicImage);
    setAddPlantName('');
  };

  const renderPlants = ({ item }) => (
    <View style= {styles.plantInformationContainer}>
      <View >
        <Image source= {{url: item.url}} style= {styles.plantImage}/>
      </View>
      <View style= {styles.item}>
        <View style= {styles.plantInfoWithRemoveButton}>
          <View>
            <View style={styles.plantName}>
              <Text style= {styles.title}>{item.name}</Text>
            </View>
            <View>
              <Text style= {styles.otherPlantInfo}>{item.location}</Text>
              <Text style= {styles.otherPlantInfo}>{item.distance}</Text>
              <Text style= {styles.otherPlantInfo}>{item.owner}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress= {() => {deleteFavorite(item.url)}}>
            <Text style= {styles.remove}>Remove</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const deleteFavorite = (url) => {//delete plant functionality here
    let tempArray = favoritesList.slice();
    return Alert.alert (
      'Delete This Plant Listing',
      'Are you sure you want to delete this plant listing?',
      [
        {
          text: 'Yes',
          onPress: () =>
            {setShowConfirmation(false);
            for (let i = 0; i < tempArray.length; i++){
              if (tempArray[i].url === url) {
                console.log (tempArray[i], 'should return info of deleted plant from mylisting') //returns deleted plant from mylistng
                tempArray.splice(i, 1);
                setFavoritesList(tempArray)
              }
            }
          },
        },
        {
          text: 'No'
        }
      ]
    );

  };

  return (
    <SafeAreaView style= {styles.container}>
      <View style= {styles.addPlantModalContainer}>
        <Modal
          animationType= 'slide'
          visible= {displayModal}
          presentationStyle= 'fullscreen'
          onRequestClose= {()=> {setDisplayModal(!displayModal);}}>
          <KeyboardAwareScrollView contentContainerStyle= {styles.addPlantModalContainer}>
            <View style= {styles.addPlantModalContainer}>
              <View style= {styles.close}>
                <Button onPress= {closeModal}>Close</Button>
              </View>
              <Image source= {{uri: imagePath}} style= {styles.image} />
              <View style= {styles.buttonLayoutPhotos}>
                <Button onPress= {selectPicture}> Choose from Gallery</Button>
                <Button onPress= {takePicture}>Take Picture</Button>
              </View>
              <View style= {styles.buttonLayoutPhotos}>
                {(imagePath != addPicImage) && imagePath ?
                  <View>
                        <TextInput
                          placeholder= 'Add Plant Common Name'
                          placeholderTextColor= 'grey'
                          value= {addPlantName}
                          onChangeText= {setAddPlantName}
                          style= {styles.textInput}
                          autoCapitalize= 'characters'
                          clearButtonMode= 'always'
                        />
                    <Button onPress= {uploadPhoto}>Upload</Button>
                  </View>
                  : null}
              </View>
            </View>
          </KeyboardAwareScrollView>
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
          data={favoritesList}
          renderItem={renderPlants}
        />
      </View>
    </SafeAreaView>
  )
}

export default MyListingHome;

const styles= StyleSheet.create({

  container: {
    height: 700,
  },

  addPlantModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
    width: 300,
    height: 300,
    borderRadius: 20,
  },

  textInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: 300,
  },

  close: {
    marginLeft: 257,
  },

  buttonLayoutPhotos: {
    display: 'flex',
    flexDirection: 'row',
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
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
    paddingTop: 15,
    paddingBottom: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: 'space-around',
  },

  plantInfoWithRemoveButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  remove: {
    marginRight: 10,
    textDecorationLine: 'underline',
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

  plantName: {
    display: 'flex',
    justifyContent: 'right',
  },
})