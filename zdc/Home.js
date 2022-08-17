import React, { useContext } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { usePlant } from '../TabNavigator.js'

export default function Home({ navigation }) {

  const {test, test1 , test2} = usePlant();
  const [user, setUser] = test;
  const [messages, setMessages] = test1;
  const [string, setString] = test2;
  // const [plantArray, setPlantArray] = test3;

  return (
      <View style={styles.container}>
        <Text>{user}</Text>
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