import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import PlantDescription from './PlantDescription'


const PlantCard = ({ item, navigate }) => {

  // const PlantDescription = ( item ) => {


  // }

  // add onPress handler that will take user to the description page'
  return (
    <TouchableWithoutFeedback onPress={() => navigate.push('Plant Description')}>
      <View style={styles.plantInformationContainer}>
        <View>
          <Image source={{ uri: item.photo }} style={styles.plantImage}/>
        </View>
          <View style= {styles.plantInfo}>
            <Image source={ item.photo } style={styles.userImage}/>
            <Text style={styles.otherPlantInfo}>{Math.floor(item.distance/10000)} miles away</Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
  )
};

const styles = StyleSheet.create({
  plantInformationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 10,
    marginLeft: 17,
    marginRight: 17,
    width: 180,
    height: 230,
  },

  plantInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: '#C2C2C2',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  plantImage: {
    width: "100%",
    height: 180,
    padding: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  userImage: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },
});

export default PlantCard;
