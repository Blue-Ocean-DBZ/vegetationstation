import React, { useState, useEffect } from 'react';
import { TouchableOpacity,Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import TradeListEntry from './TradeListEntry.js'
import plantData from '../exampleData/Dummy.js'
const axios = require('axios')

//props needed
  //username
  //user plants info
    //user plant photos
    //user_plant_id
    //target_user_id
    //target_plant_id
  //
const TradeModal = (props) => {

  const navigation = useNavigation()
  const [postData, setPostData] = useState({plant_offer_id: null, plant_target_id: 15})

  let goBack = () => {
    props.closeModal(false)
  }

  //set users plant id to trade
  let setImage =  async (plantID) => {
    setPostData({...postData, plant_offer_id: plantID});
    console.log(postData)
  }

  useEffect(() => {
  },[])
  let submitTrade = (obj) => {
    //if plant not chosen
    if(postData.plant_offer_id === null) {
      Alert.alert('Select', 'You must select a plant.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      //if plant chosen post trade
      return axios.post('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades', postData)
      .then((response) => {
        setPostData({...postData, plant_offer_id: null});
        Alert.alert('Sent', 'Trade proposal sent.', [
          { text: 'OK', onPress: () => console.log('Post sent') },
        ]);
        props.closeModal(false)
        console.log(postData, 'DDATTTTTTTAAAAA')
      })
      .catch((error) => {
        props.closeModal(false)
        console.log(`Error in Posting trade`, error.AxiosError);
      });
    }
  }

  return (

    <View style={styles.centeredView}>
      <View style ={styles.TradeHeader}>
        <View>
          <AntDesign name="arrowleft" size={24} color="black" style={{paddingLeft: 18}} onPress={goBack}/>
        </View>
        <TouchableOpacity style={styles.header} onPress={submitTrade} >
          <Image
            style={styles.logo}
            source={{
            uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==',
            }}
          />
          <Text style={styles.SubmitText}>Submit Trade</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.UserContainer}>
          <Text style={styles.UserText}>Goku's plants</Text>{/* Replace with curr username */}
    </View>
    <View>
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.TradeContainer}>
            <View style={styles.TradeEntryContainer}>
              {plantData.map((plant, index) =>
                <TradeListEntry
                plant={plant}
                key={index}
                setImage={setImage}
                selectedImage={postData.plant_offer_id}
                />
              )}
            </View>
          </View>
        </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create({
  TradeHeader: {
    alignSelf: "stretch",
    // paddingTop: 5,
    alignContent: 'space-between',
    paddingRight: 18,
    justifyContent: 'space-between',
    flexDirection: 'row',


  },
  SubmitTrade: {
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    // justifyContent: 'center',
    paddingBottom: 5,
    alignItems: 'center',
  },
  TradeContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginTop:40,

  },
  TradeEntryContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0 -35,
    minWidth: '100%',
    maxHeight:'100%',

  },
  centeredView: {

    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  modalView: {
    margin: 10,
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
    backgroundColor: '#F194FF',
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
  logo: {
    width: 20,
    height: 20,
  },
  plantOptions: {
    width: 50,
    height: 50,
  },
  SubmitText: {
    fontSize: 9,
    paddingTop: 5
  },
  UserContainer: {
  textAlign: 'left',
  width: '100%',
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
  paddingBottom: 4,
  },
  UserText: {
    fontSize: 20,
    paddingLeft:20,
    fontWeight: 'bold'
    },
});

export default TradeModal;