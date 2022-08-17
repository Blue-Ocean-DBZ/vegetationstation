import React, { useState, useEffect } from 'react';
import { Button, TouchableOpacity,Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView } from 'react-native';

import plantData from '../exampleData/Dummy.js'
import TradeModal from './TradeModal.js'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
const axios = require('axios')


const OpenModal = ({ navigation: { navigate } }) => {

  const [modalVisible, setModalVisible] = useState(false);
   const navigation = useNavigation();

  let closeModal =  (plantID) => {
    setModalVisible(false);
  }

  return (
    <View style={styles.centeredView}>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TradeModal closeModal={closeModal}/>
          </View>
        </View>
      </Modal>
      <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Trade</Text>
      </Pressable>
      <Button title="Go to Inbox" onPress={() => navigate('Inbox')} />
    </View>

  );
};


const styles = StyleSheet.create({

  centeredView: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
//alignItems: 'flex-end',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#B3CB9B',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
export default OpenModal;