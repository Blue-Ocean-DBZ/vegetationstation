import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';

import AddPlantModal from './AddPlantModal.js'

const MyListingHome = () => {

  const [displayModal, setDisplayModal] = useState(false);

  const handleAddPlnnt = () => {
    setDisplayModal(true);
  }

  return (
    <View>
      <View style= {styles.addPlantModalContainer}>
        <Modal
          animationType= 'slide'
          visible= {displayModal}
          presentationStyle= 'fullscreen'
          onRequestClose= {()=> {setDisplayModal(!displayModal);}}>
            <View style= {styles.addPlantModalContainer}>
              <Text>Hello World</Text>
              <Text>Add Features</Text>
              <Pressable
                style= {[styles.button, styles.buttonClose]}
                onPress= {() => [setDisplayModal(!displayModal)]}>
                <Text>Close Modal</Text>
              </Pressable>
            </View>
          </Modal>
      </View>

      <View style= {styles.overallContainer}>
        <View style= {styles.header}>
          <Title style= {styles.headerTitle}>My Listings</Title>
          <TouchableOpacity
            onPress= {handleAddPlnnt}>
            <Text>Pick a Plant</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Card>
            <View style= {styles.plantCardContainer}>
              <Card.Cover style= {styles.plantImage} source= {{url: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/indoor-plants-1634736990.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*'}} />
              <View style= {styles.plantCardInformation}>
                <Title style= {styles.plantName}>Plant Name</Title>
                <Paragraph>Location (XXXX mi away)</Paragraph>
                <Paragraph>Username</Paragraph>
              </View>
            </View>
          </Card>

          <Card>
            <View style= {styles.plantCardContainer}>
              <Card.Cover style= {styles.plantImage} source= {{url: 'https://cdn.shopify.com/s/files/1/0150/6262/products/the-sill_money-tree_small_bryant_black.jpg?v=1653591376'}} />
              <View style= {styles.plantCardInformation}>
                <Title style= {styles.plantName}>Plant Name</Title>
                <Paragraph>Location (XXXX mi away)</Paragraph>
                <Paragraph>Username</Paragraph>
              </View>
            </View>
          </Card>
        </ScrollView>
      </View>
    </View>
  )
}

export default MyListingHome;

const styles= StyleSheet.create({
  overallContainer: {
    marginTop: 40,
    marginRight: 10,
    marginLeft: 10,
    height: 500,
    width: 'auto',
  },

  addPlantModalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation:2,
  },

  buttonClose: {
    backgroundColor: "#2196F3",
  },

  header: {
    display: 'fles',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  headerTitle: {
    fontSize: 25,
  },

  plantCardContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },

  plantImage: {
    width: 100,
    height: 100,
  },

  plantCardInformation: {
    marginLeft: 15,
  },

  plantName: {
    marginTop: 20,
    marginBottom: 0,
    fontSize: 20,
    fontWeight: 'bold',
  }
})