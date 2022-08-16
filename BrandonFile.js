import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import EditProfile from './components/Auth/EditProfile.js'
import MyListingHome from './MyListing/MyListingHome.js';
import MyFavoritesHome from './MyFavorites/MyFavoritesHome.js';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <View style={styles.container}>
      {true ? <MyListingHome /> : <MyFavoritesHome />}
    </View>

);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  },
  });
