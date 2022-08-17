import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './zdc/Home.js';
import MyPlants from './zdc/MyPlants.js';
import Trades from './zdc/Trades.js';
import Favorites from './zdc/Favorites.js';
import Profile from './components/Profile.js';
import EditProfile from './zdc/EditProfile.js';
import PlantPage from './zdc/PlantPage.js';
import TradeInbox from './components/Trades/TradeInbox/TradeInbox.js';

import { auth } from './firebase.js';

const axios = require('axios');

//Navigators

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const MyPlantStack = createNativeStackNavigator();
const TradeStack = createNativeStackNavigator();
const FavoritesStack = createNativeStackNavigator();

// Stack Navigations for each individual tabs

function HomeStackScreen(props) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Edit Profile" component={EditProfile} />
      <HomeStack.Screen name="Plant Card" component={PlantPage} />
      <HomeStack.Screen name="Trade Requests" component={TradeInbox} />
    </HomeStack.Navigator>
  );
}

function MyPlantStackScreen() {
  return (
    <MyPlantStack.Navigator>
      <MyPlantStack.Screen name="My Plants" component={MyPlants} />
      {/* <MyPlantStack.Screen name="Profile" component={Profile} /> */}
    </MyPlantStack.Navigator>
  );
}

function TradeStackScreen() {
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen name="Trade" component={TradeInbox} options={{ headerShown: false}}/>
    </TradeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorite" component={Favorites} />
    </FavoritesStack.Navigator>
  );
}

// Use Context for passing props
export const PlantContext = React.createContext()

export function usePlant () {
  const {test1 , test2, test3} = useContext(PlantContext);
  return {test1, test2, test3};
}

// Tab Navigator, individual stack navigators are nested inside

export default function TabNavigator() {

  const firebaseID = auth.currentUser.uid;

  const [user, setUser] = useState('');
  const [messages, setMessages] = useState(null);
  const [string, setString] = useState('This is working');
  const [plantArray, setPlantArray] = useState([1, 2, 3]);

  useEffect(() => {
    console.log('before axios', firebaseID)
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/userId?${firebaseID}`)
    .then((response) => {
      console.log('after axios', response);
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <PlantContext.Provider
      value ={{
        test1: [messages, setMessages],
        test2: [string, setString],
        test3: [plantArray, setPlantArray]}}>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {backgroundColor: "#8eb69b"},
        tabBarActiveTintColor: "#fefae0",
        tabBarInactiveTintColor: "black",
        // tabBarShowLabel: false,
        headerShown: false,
      }}>
        <Tab.Screen
          name="HomePage" component={HomeStackScreen}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: "#8eb69b"
            },
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size}/>
            ),
          })}/>
        <Tab.Screen
          name="MyPlants" component={MyPlantStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="leaf-outline" color={color} size={size}/>
            )
          }}/>
        <Tab.Screen
          name="Trades" component={TradeStackScreen}
          options={({ route }) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: "#8eb69b"
            },
            tabBarBadge: messages,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="chatbox-ellipses-outline" color={color} size={size}/>
            ),
          })}/>
        <Tab.Screen
          name="Favorites" component={FavoritesStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="heart-outline" color={color} size={size}/>
            )
          }}/>
      </Tab.Navigator>
    </PlantContext.Provider>
  );
}

// Helper function for removing Tab Bar visibility

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  if (routeName == 'Profile') {
    return 'none';
  }
  if (routeName == 'Trade') {
    return 'none';
  }
  return 'flex';
}


// #b3cb9b
// #bc6c25
// #283618
// #606c38
// #fefae0
// #dda15e
// #b3cb9b
// #2c3d36
// #b2b2b2

//8eb69b
//daf1de
//606c38


//907a48
//fefae0