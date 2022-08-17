import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './components/Auth/Login.js';
// import Register from './components/Auth/Register.js';
// import EditProfile from './components/Auth/EditProfile.js';
import PlantDescription from './components/Plants/PlantDescription.js';

export default function App() {

  const Stack = createNativeStackNavigator();
  const [requestTrade, setRequestTrade] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PlantDescription" component={PlantDescription} options={{
          title: 'Plant Description',
          headerRight: () => (
            <Button
              onPress={() => setRequestTrade(true)}
              title={requestTrade ? 'Trade Pending':'Trade'}
              disabled={requestTrade ? true:false}
              color="#000"
              style={styles.tradeButton}
            />
          ),
          }}/>
        {/* <Stack.Screen options={{ headerShown: false}} name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false}}/>
        <Stack.Screen name="EditProfile" component={EditProfile} options={{title: 'Edit Profile'}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
