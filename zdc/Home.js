import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { usePlant } from '../TabNavigator.js'

export default function Home({ navigation }) {

  const {userIdentity, userZipcode, userProfilePicture, test1 , test2, test3} = usePlant();
  const [userId, setUserId] = userIdentity;
  const [userZip, setUserZip] = userZipcode;
  const [userProfilePic, setUserProfilePic] = userProfilePicture;
  const [messages, setMessages] = test1;
  const [word, setWord] = test2;
  // const [plantArray, setPlantArray] = test3;

  return (
      <View style={styles.container}>
        <Text>{userZip}</Text>
        <Button
          title="Profile"
          onPress={() => navigation.navigate('Profile')}
        />
        <Button
          title="Trade Requests"
          onPress={() => navigation.navigate('Trade Requests')}
        />
        <Button
          title="Set the Messages"
          onPress={() => setMessages(5)}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfd',
    alignItems: 'center',
    justifyContent: 'center',
  },
});