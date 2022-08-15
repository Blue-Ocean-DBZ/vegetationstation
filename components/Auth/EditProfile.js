import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { storage, auth, signOutUser } from '../../firebase.js'

const EditProfile = () => {
  const [username, setUsername] = useState(auth.currentUser?.displayName)
  const [zipcode, setZipcode] = useState('')
  const [status, setStatus] = useState('')
  const [image, setImage] = useState({uri: auth.currentUser?.photoURL})
  const navigation = useNavigation()

  const saveHandler = () => {
    if(zipcode.length !== 5) alert('Please enter a valid zipcode')
    // send uid to backend
    // send all user info to other views to access (username, email, uid, )
    // take you back to homepage
      // uncomment when homepage is made
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Homepage' }],
      // });
  }

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
        setImage({uri: pickerResult.uri});
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
          {image.uri ? <Image source={image} style={styles.thumbnail}/> :
          <Image source={require('./placeholder/gui.png')} style={styles.thumbnail}/>}
          <TouchableOpacity style={styles.imageEdit} onPress={openImagePickerAsync}>
            <Text style={styles.imageEditButton}>Edit Profile Image</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{username}</Text>
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Zip Code</Text>
          <TextInput placeholder='Zip Code' placeholderTextColor='#D3D3D3'  autoCapitalize='none' value={zipcode} style={styles.input} onChangeText={text => setZipcode(text)} maxLength={5} minLength={5}/>
          <Text style={styles.label}>Status</Text>
          <TextInput placeholder='Status' placeholderTextColor='#D3D3D3'  autoCapitalize='none' value={status} style={styles.input} onChangeText={text => setStatus(text)}/>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.buttonGrp} onPress={saveHandler}>
            <Text style={styles.button}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGrp} onPress={logoutHandler}>
            <Text style={styles.button}>Logout</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3D36',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  inputContainer: {
    width: '95%',
    padding: 14
  },
  input: {
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
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
  label: {
    color: 'whitesmoke',
    paddingHorizontal: 7,
    fontSize: 16,
    marginTop: 10
  },
  profileImgContainer: {
    height: 200,
    width: '100%',
    alignItems:'center',
    borderRadius: 100,
    position: 'relative',
    marginBottom: 45
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
    // overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageEditButton: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontSize: 20,
    fontWeight: '700',
    color:'white'
  },
  username: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 10,

    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke'
  }
});

export default EditProfile