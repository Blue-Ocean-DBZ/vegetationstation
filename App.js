import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import EditProfile from './components/Auth/EditProfile.js'
import OpenModal from './components/Trades/TradeModal/OpenModal.js'
import TradeInbox from './components/Trades/TradeInbox/TradeInbox.js'

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Modal" options={{ headerShown: false}} component={OpenModal} />
        <Stack.Screen name="Inbox" options={{headerShown: false}} component={TradeInbox} />
        {/* <Stack.Screen options={{ headerShown: false}} name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
