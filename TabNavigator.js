import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './zdc/Home.js';
import MyPlants from './zdc/MyPlants.js';
import Trades from './zdc/Trades.js';
import Favorites from './zdc/Favorites.js';
import Profile from './zdc/Profile.js';
import EditProfile from './zdc/EditProfile.js';
import PlantPage from './zdc/PlantPage.js';
import TradeRequests from './zdc/TradeRequests.js';

//multiple stack navigations inside individual tab navigations

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();
const MyPlantStack = createNativeStackNavigator();
const TradeStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Edit Profile" component={EditProfile} />
      <HomeStack.Screen name="Plant Card" component={PlantPage} />
      <HomeStack.Screen name="Trade Requests" component={TradeRequests} />
    </HomeStack.Navigator>
  );
}

function MyPlantStackScreen() {
  return (
    <MyPlantStack.Navigator>
      <MyPlantStack.Screen name="My Plants" component={MyPlants} />
    </MyPlantStack.Navigator>
  );
}

function TradeStackScreen() {
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen name="Trades" component={Trades} />
    </TradeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={Favorites} />
    </FavoritesStack.Navigator>
  );
}

export default function TabNavigator() {

  return (
      <Tab.Navigator screenOptions={{
        // tabBarLabelStyle: {color: "black"},
        tabBarActiveTintColor: "black",
        // tabBarInactiveTintColor: "grey",
        headerShown: false,
      }}>
        <Tab.Screen
          name="HomePage" component={HomeStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="MyPlants" component={MyPlantStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="leaf-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="Trad3" component={TradeStackScreen}
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="chatbox-ellipses-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="Favorite$" component={FavoritesStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="heart-outline" size={size}/>
            )
          }}/>
      </Tab.Navigator>
  );
}
