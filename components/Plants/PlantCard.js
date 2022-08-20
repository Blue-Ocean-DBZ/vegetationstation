import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Logo from './../Auth/placeholder/logo.png';

const PlantCard = ({ item, navigate }) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigate.push('Plant Description', item )}>
      <View style={styles.plantInformationContainer}>
        <View>
          <Image source={{ uri: item.photo }} style={styles.plantImage}/>
        </View>
          <View style= {styles.plantInfo}>
            <Image
              source={item.profile_pic !== "fake.com" ? { uri: item.profile_pic } : Logo}
              style={styles.userImage}
            />
            <Text style={styles.otherPlantInfo}>{ Math.round((item.distance / 1609) * 10) / 10 } miles away</Text>
          </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  plantInformationContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    width: '50%',
    height: 230,
  },

  plantInfo: {
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
    backgroundColor: '#E3EEE6',
  },
});

export default PlantCard;
