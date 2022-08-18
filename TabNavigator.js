import React, { useState, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './components/Home.js';

import MyPlants from './zdc/MyPlants.js';
import Trades from './zdc/Trades.js';
import MyFavoritesHome from './components/MyFavorites/MyFavoritesHome.js';
import MyListingHome from './components/MyListing/MyListingHome.js';
import Profile from './components/Profile.js';
import EditProfile from './components/Auth/EditProfile.js';
// import PlantPage from './zdc/PlantPage.js';
import PlantDescription from './components/Plants/PlantDescription.js';
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
      <HomeStack.Screen name="EditProfile" component={EditProfile} />
      {/* <HomeStack.Screen name="Plant Card" component={PlantPage} /> */}
      <HomeStack.Screen name="Plant Description" component={PlantDescription} options={{
          title: 'Plant Description',
          // headerRight: () => (
          //   <Button
          //     onPresrs={() => setRequestTrade(true)}
          //     title={requestTrade ? 'Trade Pending':'Trade'}
          //     disabled={requestTrade ? true:false}
          //     color="#000"
          //     style={styles.tradeButton}
          //   />
          // ),
          }}/>
      <HomeStack.Screen name="Trade Modal" component={TradeInbox} />
    </HomeStack.Navigator>
  );
}

function MyPlantStackScreen() {
  return (
    <MyPlantStack.Navigator>
      <MyPlantStack.Screen name="My Plants" component={MyListingHome} />
    </MyPlantStack.Navigator>
  );
}

function TradeStackScreen() {
  return (
    <TradeStack.Navigator>
      <TradeStack.Screen name="Trade" component={TradeInbox} />
    </TradeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorite" component={MyFavoritesHome} />
    </FavoritesStack.Navigator>
  );
}

// Use Context for passing props
export const PlantContext = React.createContext()

export function usePlant () {
  const {userIdentity, userZipcode, userProfilePicture, plantList, test1 , test2, test3} = useContext(PlantContext);
  return {userIdentity, userZipcode, userProfilePicture, plantList, test1, test2, test3};
}

// Tab Navigator, individual stack navigators are nested inside

export default function TabNavigator() {

  const firebaseID = auth.currentUser.uid;

  const [userId, setUserId] = useState(null);
  const [userZip, setUserZip] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState('');
  const [messages, setMessages] = useState(null);
  const [string, setString] = useState('This is working');
  const [plantArray, setPlantArray] = useState([]);

  useEffect( () => {
      async function fetchData() {
      try {
        const response = await axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/userId?firebase_id=${firebaseID}`)
        setUserId(response.data.id);
        setUserZip(response.data.zip);
        setUserProfilePic(response.data.profile_pic);
        const resp = await axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/all?user_id=${userId}`)

        setPlantArray(resp.data);
      }
      catch { err =>
        console.log('final error', err);
       }
      }
      fetchData();
  }, [userZip])

  return (
    <PlantContext.Provider
      value ={{
        userIdentity: [userId, setUserId],
        userZipcode: [userZip, setUserZip],
        userProfilePicture: [userProfilePic, setUserProfilePic],
        test1: [messages, setMessages],
        test2: [string, setString],
        plantList: [plantArray, setPlantArray]}}>
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
          options={{
            tabBarBadge: messages,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="chatbox-ellipses-outline" color={color} size={size}/>
            ),
          }}/>
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