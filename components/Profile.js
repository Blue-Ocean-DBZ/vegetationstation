import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback } from 'react-native';
import { signOutUser, auth } from '../firebase.js';
import { useNavigation } from '@react-navigation/core';
import { usePlant } from '../TabNavigator.js';
import axios from 'axios';
export default function Profile () {
  const {userZipcode, userIdentity} = usePlant();
  const [zip, setZip] = userZipcode;
  const [id, setId] = userIdentity;
  const [user, setUser] = useState('Earth');

  useEffect(()=> {
    // check to see if zip code changes
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/userId?firebase_id=${auth.currentUser.uid}`)
      .then(({data})=>{
        setUser(data);
      })
  }, [zip])

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

  const handleEditProfile = () => {
    navigation.push('EditProfile')
    };

  return (
    <View style={styles.container}>
      <Image style={styles.topImage} source={{uri:'https://img.freepik.com/free-vector/tropical-mural-wallpaper-design_23-2148679938.jpg?w=2000'}}/>
      <View style={styles.photoContainer}>
        <Image style={styles.profilePhoto} source={{uri: auth.currentUser?.photoURL}}/>
        <View style={styles.userInfoContainer}>
          <Text style={styles.name}>{auth.currentUser?.displayName}</Text>
          <Text style={styles.city}>{user.city || 'United States'}, {user.state || 'Earth'}</Text>
          {user.user_status ?
          <View style={styles.statusWrapper}>
            <Text style={styles.city}>Status:</Text>
            <Text style={styles.status}>{user.user_status?.trim()}</Text>
          </View>
        :
''
        }
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={styles.buttonGrp} >
          <Text style={styles.button} onPress={handleEditProfile}>Edit Profile</Text>
          <Text style={styles.button} onPress={logoutHandler}>Log Out</Text>
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
    height: 250,
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
    fontSize: 20,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: '#2C3D36'
  },
  city: {
    fontSize: 15
  },
  button: {
    height: 60,
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#2C3D36',
    borderColor: '#2C3D36',
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold',
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
statusWrapper: {
  height: 50,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 7,
},
status: {
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: "#8eb69b",
    fontWeight: "700",
    textTransform: "uppercase",
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginLeft: 3
  }
});

