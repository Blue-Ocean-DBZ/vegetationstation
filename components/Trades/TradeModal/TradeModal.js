import React, { useState, useEffect } from 'react';
import { TouchableOpacity,Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableWithoutFeedback,useWindowDimensions, ScrollView } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import TradeListEntry from './TradeListEntry.js'
import { auth } from '../../../firebase.js'
import { usePlant } from '../../../TabNavigator.js';
const axios = require('axios')

const TradeModal = (props) => {

  const navigation = useNavigation()
  const [userPlantInfo, setUserPlantInfo] = useState([])
  const { getInbox, userIdentity } = usePlant();
  const [userId, setUserId] = userIdentity;
  const [postData, setPostData] = useState({plant_offer_id: null, plant_target_id: props.selectedPlant, user_id: userId})

  let goBack = () => {
    props.closeModal(false)
  }

  let setImage = (plantID) => {
    setPostData({...postData, plant_offer_id: plantID});

  }

  useEffect(() => {
    axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/myplants?user_id=${userId}`)
    .then((response) => {
      setUserPlantInfo(response.data)
    })
    .catch((err) => {
      console.log(err, 'error in TradeModal')
    })
  },[])

  let submitTrade = (obj) => {
    //if plant not chosen
    if(postData.plant_offer_id === null) {
      Alert.alert('Select', 'You must select a plant.', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ]);
    } else {
      return axios.post('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades', postData)
    .then((response) => {
      Alert.alert('Sent', 'Trade proposal sent.', [
        { text: 'OK', onPress: () => console.log('Post sent') },
      ]);
      props.closeModal(false)
    })
    .then((response) => {
      setPostData({...postData, plant_offer_id: null});
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
          <Text style={styles.UserText}>{auth.currentUser.displayName}'s plants</Text>{/* Replace with curr username */}
    </View>
    <View>
      </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.TradeContainer}>
            <View style={styles.TradeEntryContainer}>
              {userPlantInfo.map((plant, index) =>
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
    paddingBottom: 5,
    alignItems: 'center',
  },

  TradeContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop:5,
  },

  TradeEntryContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontWeight: 'bold',
    },
});

export default TradeModal;