import React, { useState, useEffect } from 'react';
import { TouchableOpacity,Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
import TradeListEntry from './TradeListEntry.js'
import plantData from '../exampleData/Dummy.js'
const axios = require('axios')
//props needed
  //username
  //user plants info
    //user plant photos
    //user_id
    //user_plant_id
    //target_user_id
    //target_plant_id

const TradeModal = (props) => {
  const [tradeData, setTradeData] = useState(
    {
      user_id: 1,//pass through props
      plant_id: null, // ADD to SCHEMA Get request for users plants? pass through props
      // created_at: 1200, //DL timestamp library
      target_user_id: 2,//pass through props
      target_plant_id: 21,//pass through props  ADD to SCHEMA
      // message:'User would like to trade his user_plant_name here for your target_plant_name.'//replace USer, User_plant_name, target_plant_name
    }
  )

  let goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Modal' }],
    });
  }

  let setImage =  (plantID) => {
    setTradeData({...tradeData, plant_id: plantID});
  }

  useEffect(() => {
  },[])

  let submitTrade = (obj) => {
    if(tradeData.plant_id === null) {

      Alert.alert('Select', 'You must select a plant.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);

    } else {

      Alert.alert('Sent', 'Trade proposal sent.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
        props.closeModal(false)//move after then
        console.log(tradeData, 'DDATTTTTTTAAAAA')
        return axios.post('http://localhost:3000/trades/post')
      .then((response) => {
        console.log('responseeeeeeeeee ', response)
      })
      .catch((error) => {
        console.log(`Error in Posting trade`);
      });
  }
  }

  return (
    <View style={styles.centeredView}>
            <View style ={styles.TradeHeader}>
            {/* <AntDesign name="arrowleft" size={24} color="black" onPress={goBack}/> */}
              <TouchableOpacity style={styles.header} onPress={submitTrade} >
                <Image
                  style={styles.logo}
                  source={{    //Submit Icon
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
                  selectedImage={tradeData.plant_id}
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
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    // paddingTop: 5,
    paddingRight: 18,
    justifyContent: 'space-between',
    flexDirection: 'row',

  },
  SubmitTrade: {
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    justifyContent: 'center',
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