import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TradeRequests() {

  return (
    <View style={styles.container}>
      <Text>Trade Requests</Text>
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