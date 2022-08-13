import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyPlants() {

  return (
    <View style={styles.container}>
      <Text>MyPlants</Text>
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