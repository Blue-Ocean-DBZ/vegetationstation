import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function Home({ navigation }) {

  return (
    <View style={styles.container}>
      <Text>Home Page</Text>
      <Button
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
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