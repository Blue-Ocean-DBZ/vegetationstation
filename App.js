import React from 'react';
import { StyleSheet, View } from 'react-native';

import MyListingHome from './MyListing/MyListingHome.js';
import MyFavoritesHome from './MyFavorites/MyFavoritesHome.js';

export default function App() {
  return (

      <View style={styles.container}>
          {false ? <MyListingHome /> : <MyFavoritesHome />}
      </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
