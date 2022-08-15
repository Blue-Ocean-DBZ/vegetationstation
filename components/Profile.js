import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { signOutUser } from '../firebase.js';
import { useNavigation } from '@react-navigation/core'

export default function App() {

  const navigation = useNavigation();

  const logoutHandler = () => {
    signOutUser()
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
  }
  return (
    <View style={styles.container}>
      <Image style={styles.topImage} source={{uri:'https://img.freepik.com/free-vector/tropical-mural-wallpaper-design_23-2148679938.jpg?w=2000'}}/>
      <View style={styles.photoContainer}>
        <Image style={styles.profilePhoto} source={{uri: 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg'}}/>
      </View>
      <View style={styles.userInfoContainer}>
        <Text style={styles.name}>Tom</Text>
        <Text style={styles.city}>From Myspace</Text>
      </View>
      <TouchableOpacity style={styles.editProfileContainer} onPress={logoutHandler}>
          <Text style={styles.editProfile}>Logout</Text>
      </TouchableOpacity>
    </View>
  );

}

// styles need to be camel case (NO justify-content)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topImage: {
    flex: .3,
    alignSelf: 'stretch',
  },
  photoContainer: {
    position: 'absolute',
    flex: .3,
    marginTop: 150,
  },
  profilePhoto: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
  },
  userInfoContainer: {
    flex: .18,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  city: {
    fontSize: 15
  },
  editProfileContainer: {
    flex: .5,
    justifyContent: 'center',
    alignSelf: 'stretch',
    padding: 3
  },
  editProfile: {
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 25,
    borderWidth: 3,
    borderColor: '#D3D3D3',
    alignSelf: 'stretch',
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#E0E0E0'
  }
});

