import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, Pressable, Image, FlatList, TextInput, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth, signOutUser } from '../../firebase.js'
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

const MyListingHome = () => {

  const addPicImage = 'https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png';
  const addPlantImage = 'https://cdn2.iconfinder.com/data/icons/plant-care-1/256/fertilize-512.png';

  const [displayModal, setDisplayModal] = useState(false);
  const [imagePath, setImagePath] = useState(addPicImage);
  const [addPlantName, setAddPlantName] = useState('');
  const [plantList, setPlantList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(true);

  useEffect(() => {
    console.log('within useeffect')
    axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/myPlants?user_id=2', {
      user_id: 2,
    })
      .then((results)=> {
        console.log(results.data, 'dfjahdkl;sjfhjsdzk;fashjk');
        setPlantList(results.data)
      })
  }, []);

  const handleAddPlant = () => {
    setDisplayModal(true);
    console.log(auth.currentUser.uid)
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
    let uri;
    let newPlant;
    const imageRef = ref(storage, filename)
    uploadBytes(imageRef, blob)
      .then(snapshot => {


          uri = `https://firebasestorage.googleapis.com/v0/b/vegetationstation1.appspot.com/o/${filename}?alt=media`;
          return uri;
         // url we get back from firebase
        console.log(uri, 'this is the uri');

      })
      .then (uri => {
        uri = uri;
        console.log (uri, 'inside the tnen statment')

      })
      .then(() => {
        newPlant = {
          id: 100,
          name: addPlantName,
          owner: auth.currentUser.displayName,
          location: 'LA',
          distance: '12 mi away',
          favorite: 'false',
          url: uri,
        };
        let tempPlantList = plantList.slice();
        tempPlantList.push(newPlant);
        setPlantList(tempPlantList)
      })
      .catch(err => console.log(err))
    setImagePath(addPicImage);


    setAddPlantName('');
  };

  const renderPlants = ({ item }) => (
    <View style= {styles.plantInformationContainer}>
      <View >
        <Image source= {{url: item.photo}} style= {styles.plantImage}/>
      </View>
      <View style= {styles.item}>
        <View style= {styles.plantInfoWithRemoveButton}>
          <View>
            <View style={styles.plantName}>
              <Text style= {styles.title}>{item.plant_name}</Text>
            </View>
            <View>
              <Text style= {styles.otherPlantInfo}>{item.zip}</Text>
              <Text style= {styles.otherPlantInfo}>{auth.currentUser.displayName}</Text>
            </View>
          </View>
          <TouchableWithoutFeedback onPress= {() => {deleteFavorite(item.id)}}>
            <Text style= {styles.remove}>Remove</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );

  const deleteFavorite = (id) => {//delete plant functionality here
    let tempArray = plantList.slice();
    let plantName;
    for (let i = 0; i < tempArray.length; i++){
      if (tempArray[i].id === id) {
        plantName = tempArray[i].plant_name;
      }
    }
    return Alert.alert (
      `Delete ${plantName}`,
      'Are you sure you want to delete this plant listing?',
      [
        {
          text: 'Yes',
          onPress: () =>
            {setShowConfirmation(false);
            for (let i = 0; i < tempArray.length; i++){
              if (tempArray[i].id === id) {
                console.log (tempArray[i], 'should return info of deleted plant from mylisting') //returns deleted plant from mylistng
                tempArray.splice(i, 1);
                setPlantList(tempArray)
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

      <View>
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
              <Text style= {styles.modalTitle}>I'm Sexy and I Grow It</Text>
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
                        {addPlantName.length > 0 ? <Button style= {styles.upload} onPress= {uploadPhoto}>Upload</Button> : null}
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
          data={plantList}
          renderItem={renderPlants}
        />
      </View>

    </SafeAreaView>
  )
}

export default MyListingHome;

const styles= StyleSheet.create({

  container: {
    height: 600,
  },

  addPlantModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  headerModal: {
    flexDirection: 'row',
    justifyContent: 'center'
  },

  modalTitle: {
    marginBottom: 15,
    fontSize: 25,
  },

  image: {
    width: 325,
    height: 325,
    borderRadius: 20,
    marginBottom: 10,
  },

  textInput: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: 300,
    fontSize: 20,
  },

  close: {
    marginLeft: 275,
  },

  buttonLayoutPhotos: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10.
  },

upload: {
    marginTop: 10,
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
    fontSize: 18,
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