import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { signOutUser } from '../firebase.js';
import { useNavigation } from '@react-navigation/core'

export default function ChatMessages () {

  return (
    <View style={styles.container}>
      <Image style={styles.topImage} source={{uri:'https://img.freepik.com/free-vector/tropical-mural-wallpaper-design_23-2148679938.jpg?w=2000'}}/>
      <View style={styles.photoContainer}>
        <Image style={styles.profilePhoto} source={{uri: 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg'}}/>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>Tommy</Text>
          <Text style={styles.city}>From Myspace</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonGrp} >
          <Text style={styles.button}>Edit Profile</Text>
          <Text style={styles.button}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
    height: '28%',
    alignSelf: 'stretch',
  },
  photoContainer: {
    position: 'absolute',
    height: '56%',
  },
  profilePhoto: {
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'white',
    alignSelf: 'center',
    marginTop: '50%'
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: 25,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  city: {
    fontSize: 15
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
    overflow: 'hidden',
    marginTop: 30,
  },
  buttonGrp: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 10,
    marginTop: '50%',
  },
  buttonWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});
