import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home.js';

import Ionicons from 'react-native-vector-icons/Ionicons';

import MyPlants from './MyPlants.js';
import Trades from './Trades.js';
import Favorites from './Favorites.js';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {

  return (
      <Tab.Navigator screenOptions={{
        // tabBarLabelStyle: {color: "black"},
        tabBarActiveTintColor: "black",
        // tabBarInactiveTintColor: "grey",
      }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="MyPlants"
          component={MyPlants}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="leaf-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="Trades"
          component={Trades}
          options={{
            tabBarBadge: 3,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="chatbox-ellipses-outline" size={size}/>
            )
          }}/>
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="heart-outline" size={size}/>
            )
          }}/>
      </Tab.Navigator>
  );
}
