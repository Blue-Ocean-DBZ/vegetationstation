import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image } from 'react-native';
import { Title, Paragraph } from 'react-native-paper';

const DATA = [
  {
    name: 'PlantOne',
    owner: 'Brandon',
    location: 'LA',
    distance: '12 mi away',
    url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*',
  },
  {
    name: 'PlantTwo',
    owner: 'Andrew',
    location: 'SF',
    distance: '312 mi away',
    url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376',
  },
];

const App = () => {

  const renderPlants = ({ item }) => (
    <View style= {styles.plantInformationContainer}>
      <View >
        <Image source= {{url: item.url}} style= {styles.plantImage}/>
      </View>
      <View style={styles.item}>
        <View style={styles.plantName}>
          <Text style= {styles.title}>{item.name}</Text>
        </View>
        <View>
          <Text style= {styles.otherPlantInfo}>{item.location} {item.distance}</Text>
          <Text style= {styles.otherPlantInfo}>{item.owner}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Title style= {styles.headerTitle}> My Favorites</Title>
      <FlatList
        data={DATA}
        renderItem={renderPlants}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    height: 500,

  },

  plantInformationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 40,
    width: '80%',
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 15,
  },

  item: {
    backgroundColor: '#CED89E',
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    flex: 1,
  },

  plantImage: {
    width: 100,
    height: 100,
    padding: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius:20,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  otherPlantInfo: {
    marginTop: 5.
  },

  plantInformation: {
    display: 'flex',
  },

  plantName: {
    display: 'flex',
    justifyContent: 'right',
  }
});

export default App;