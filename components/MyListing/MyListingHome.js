import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Modal, Pressable, Image, FlatList, TextInput, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Alert } from 'react-native';
import { Button, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ref, uploadBytes } from "firebase/storage";
import { storage, auth, signOutUser } from '../../firebase.js'
import axios from 'axios';

const MyListingHome = () => {
  //be able to get access to user ID
  const addPicImage = 'https://cdn.pixabay.com/photo/2018/11/13/21/44/instagram-3814061_1280.png';
  const addPlantImage = 'https://cdn2.iconfinder.com/data/icons/plant-care-1/256/fertilize-512.png';

  const [displayModal, setDisplayModal] = useState(false);
  const [imagePath, setImagePath] = useState(addPicImage);
  const [addPlantName, setAddPlantName] = useState('');
  const [plantList, setPlantList] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(true);

  useEffect(() => {
    console.log('this is the auth', auth)
    axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/myPlants?user_id=7')
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

  const closeModal = async () => {
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
      })
      .then (uri => {
        uri = uri;
      })
      .then(() => {
        axios.post ('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/plant', {
          plant_name: addPlantName,
          photo: uri,
          user_id: 7,
        })
      })
      .then(()=> {
        axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/myPlants?user_id=7')
        .then((results)=> {
          setPlantList(results.data)
        })
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
          <TouchableWithoutFeedback onPress= {() => {deleteFavorite(item.plant_id)}}>
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
      if (tempArray[i].plant_id === id) {
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
              if (tempArray[i].plant_id === id) {
                console.log (tempArray[i], 'should return info of deleted plant from mylisting') //returns deleted plant from mylistng
                let plant_id = tempArray[i].plant_id
                tempArray.splice(i, 1);
                setPlantList(tempArray)
                axios.delete(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/plant?plant_id=${plant_id}`)
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