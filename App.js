import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Auth/Login.js'
import Register from './components/Auth/Register.js'
import TabNavigator from './TabNavigator.js'
import EditProfile from './components/Auth/EditProfile.js'
import Home from './components/Home.js'
import Profile from './components/Profile.js';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile"
          component={EditProfile}
          options={{
            headerShown: true,
            title: 'Edit Profile'
          }} />
        <Stack.Screen name="Profile" component={Profile} options={{ title: 'Profile' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
