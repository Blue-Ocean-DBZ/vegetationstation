import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from './components/Home.js';
import MyPlants from './zdc/MyPlants.js';
import Trades from './zdc/Trades.js';
import MyFavoritesHome from './components/MyFavorites/MyFavoritesHome.js';
import MyListingHome from './components/MyListing/MyListingHome.js';
import Profile from './components/Profile.js';
import EditProfile from './zdc/EditProfile.js';
import PlantPage from './zdc/PlantPage.js';
import PlantDescription from './components/Plants/PlantDescription.js';
import TradeInbox from './components/Trades/TradeInbox/TradeInbox.js';

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
      <HomeStack.Screen name="Plant Description" component={PlantDescription} options={{
          title: 'Plant Description',
          // headerRight: () => (
          //   <Button
          //     onPress={() => setRequestTrade(true)}
          //     title={requestTrade ? 'Trade Pending':'Trade'}
          //     disabled={requestTrade ? true:false}
          //     color="#000"
          //     style={styles.tradeButton}
          //   />
          // ),
          }}/>
      <HomeStack.Screen name="Trade Requests" component={TradeInbox} />
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
      <TradeStack.Screen name="Trade" component={Trades} />
    </TradeStack.Navigator>
  );
}

function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="My Favorites" component={MyFavoritesHome} />
    </FavoritesStack.Navigator>
  );
}


// Use Context for passing props
export const PlantContext = React.createContext()

export function usePlant () {
  const {test, test1 , test2, plantList} = useContext(PlantContext);
  return {test, test1, test2, plantList};
}

// Tab Navigator, individual stack navigators are nested inside

export default function TabNavigator() {

  const firebaseID = auth.currentUser.uid;

  const [user, setUser] = useState('');
  const [messages, setMessages] = useState(null);
  const [string, setString] = useState('This is working');
  const [plantArray, setPlantArray] = useState([]);

  useEffect(() => {
    console.log('before axios', firebaseID)
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/userId?firebase_id=${firebaseID}`)
    .then((response) => {
      console.log('after axios', response.data);
      setUser(response.data);
    })
    .then(() => {
      axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/all?user_id=${user.id}`)
      .then((response) => {
        setPlantArray(response.data);
      })
      .catch(err => console.log('error setting plant array', err))
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <PlantContext.Provider
      value ={{
        test: [user, setUser],
        test1: [messages, setMessages],
        test2: [string, setString],
        plantList: [plantArray, setPlantArray]}}>
      <Tab.Navigator screenOptions={{
        tabBarStyle: {backgroundColor: "#606c38"},
        tabBarActiveTintColor: "#fefae0",
        tabBarInactiveTintColor: "black",
        // tabBarShowLabel: false,
        headerShown: false,
      }}>
        <Tab.Screen
          name="HomePage" component={HomeStackScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size}/>
            )
          }}/>
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
            tabBarBadge: 3,
            tabBarIcon: ({color, size}) => (
              <Ionicons name="chatbox-ellipses-outline" color={color} size={size}/>
            )
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
