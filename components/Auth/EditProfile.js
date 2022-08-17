import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth, signOutUser } from '../../firebase.js'
import { PlantContext } from '../../TabNavigator.js'

const EditProfile = () => {
  const data = useContext(PlantContext)
  const [id, setId] = useState('')
  const [username, setUsername] = useState(auth.currentUser?.displayName)
  const [zipcode, setZipcode] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState(auth.currentUser?.photoURL || 'https://th-thumbnailer.cdn-si-edu.com/bZAar59Bdm95b057iESytYmmAjI=/1400x1050/filters:focal(594x274:595x275)/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/95/db/95db799b-fddf-4fde-91f3-77024442b92d/egypt_kitty_social.jpg')
  const navigation = useNavigation()

  useEffect(() => {
    setZipcode(data?.userZipcode[0])
    setId(data?.userIdentity[0])
  }, [id])

  //from axios

  const saveHandler = () => {
    if(zipcode.length !== 5) {
      alert('Please enter a valid zipcode');
      return;
    }
    if(id === undefined) {
      axios.post('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/user', {
        username,
        firebase_id: auth.currentUser.uid,
        profile_pic: auth.currentUser?.photoURL || image,
        zip: zipcode
      })
        .then(() => {
          navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigator' }],
          });
        })
        .catch(err => alert('Please enter a valid zipcode'))
    } else {
      axios.put('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/user', {
        user_id: id,
        profile_pic: auth.currentUser?.photoURL || image,
        zip: zipcode
      })
        .then((data) => {
          console.log(data)
          navigation.goBack()
        })
        .catch((err) => {
          console.log(err)
          alert('Please enter a valid zipcode')
        })
    }
  }

  if (auth.currentUser?.photoURL === null) {
    updateProfile(auth.currentUser, {
      photoURL: image
    })
  };

  const logoutHandler = () => {
    signOutUser()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
  }

  const openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    const res = await fetch(pickerResult.uri)
    const blob = await res.blob()
    const filename =  pickerResult.uri.substring(pickerResult.uri.lastIndexOf('/') + 1)
    const imageRef = ref(storage, filename)
    uploadBytes(imageRef, blob)
      .then(snapshot => {
        const uri = `https://firebasestorage.googleapis.com/v0/b/vegetationstation1.appspot.com/o/${filename}?alt=media`
        setImage(pickerResult.uri);
        updateProfile(auth.currentUser, {
          photoURL: uri
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.profileImgContainer}>
          <Image source={{uri: image}} style={styles.thumbnail}/>
          <TouchableOpacity style={styles.imageEdit} onPress={openImagePickerAsync}>
            <Text style={styles.imageEditButton}>Change Profile Image</Text>
          </TouchableOpacity>
        </View>
          <Text style={styles.username}>{username}</Text>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Zip Code' placeholderTextColor='#D3D3D3'  autoCapitalize='none' value={zipcode} style={styles.input} onChangeText={text => setZipcode(text)} maxLength={5} minLength={5} keyboardType="number-pad"/>
          <Text style={styles.notice}>We use your zip code to locate plant swappers near the area.</Text>
          <TextInput placeholder='Status' placeholderTextColor='#D3D3D3'  autoCapitalize='none' value={status} style={styles.input} onChangeText={text => setStatus(text)}/>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.buttonGrp} onPress={saveHandler}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.buttonGrp} onPress={logoutHandler}>
            <Text style={styles.button}>Temporary Logout</Text>
          </TouchableOpacity> */}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    position: 'relative',
    paddingTop: "15%"
  },
  inputContainer: {
    width: '95%',
    padding: 14
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16
  },
  buttonWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonGrp: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 10
  },
  button: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1B2722',
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '700',
    color: 'whitesmoke',
    overflow: 'hidden'
  },
  profileImgContainer: {
    height: 200,
    width: '50%',
    alignItems:'center',
    borderRadius: 100,
    position: 'relative',
    marginBottom: 21
  },
  thumbnail: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  imageEdit: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageEditButton: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 16,
    textShadowColor: '#2C3D36',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 1,
    fontWeight: '700',
    color:'white'
  },
  username: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#2C3D36'
  },
  notice: {
    color: '#888',
    marginVertical: 7,
    paddingHorizontal: 7
  }
});

export default EditProfile