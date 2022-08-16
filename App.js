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
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen options={{ headerShown: false}} name="Login" component={Login} />
    //     <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
    //     <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/>
    //   </Stack.Navigator>
    // </NavigationContainer>

    <View style={styles.container}>
      {false ? <MyListingHome /> : <MyFavoritesHome />}
    </View>

);
}

const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: '#fff',
  },
  });
