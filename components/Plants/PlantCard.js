import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Fontisto } from '@expo/vector-icons';

const PlantCard = ({ item }) => {

  return (
    <View style={styles.plantInformationContainer}>
      <View>
        <Image source={{ url: item.url }} style={styles.plantImage}/>
      </View>
      <View style= {styles.item}>
        <View style= {styles.plantInfoWithHeartButton}>
          <View>
            <View style={styles.plantName}>
              <Text style={styles.title}>{item.name}</Text>
            </View>
            <View>
              <Text style={styles.otherPlantInfo}>{item.distance}</Text>
              {/* <Text style={styles.otherPlantInfo}>{item.owner}</Text> */}
              <Image source={item.profile_pic} style={styles.userImage}/>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  plantInformationContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    marginLeft: 40,
    width: '80%',
  },

  item: {
    backgroundColor: '#F2F2F2',
    borderColor: '#C2C2C2',
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    flex: 1,
    justifyContent: 'space-around',
  },

  plantInfoWithHeartButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  heart: {
    marginRight: 10,
    color: 'red',
  },

  plantImage: {
    width: 100,
    height: 100,
    padding: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius:20,
  },

  userImage: {
    width: 30,
    height: 30,
    borderRadius: '50%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  otherPlantInfo: {
    marginTop: 5
  },

  plantName: {
    display: 'flex',
    justifyContent: 'right',
  }
});

export default PlantCard;
