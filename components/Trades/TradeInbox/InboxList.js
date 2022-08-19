import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
const axios = require('axios')
import ImageModal from 'react-native-image-modal';
import { useNavigation } from '@react-navigation/core'
import { usePlant } from '../../../TabNavigator.js';

const InboxList = (props) => {
  // console.log('props.USER ID', props.userID)
  const navigation = useNavigation();

  const {userMessages} = usePlant();
  const [messages, setMessages] = userMessages;

  let acceptTrade = () => {
    let tradeId = props.entry.trade_id
    let userID = props.userID
    console.log(userID)
    return axios.put(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades`,
    {trade_id: tradeId, user_id: userID, accepted: true})
  .then((response) => {
    props.getInbox(userID)
    console.log('Accepted succesful', response)
  })
  .catch((err) => {
    console.log('Accept trade did not work', err)
  })

  }

  let declineTrade = () => {
      console.log('Declined')
      let tradeId = props.entry.trade_id
      let userID = props.userID
      return axios.put(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades`,
      {trade_id: tradeId, user_id: userID, accepted: false})
    .then((response) => {
      props.getInbox(userID)
      console.log('Declined succesful', response)
    })
    .catch((err) => {
      console.log('Error in decline trade', err)
    })
  }

  let shownToUser = () => {
    console.log('shown')
    let tradeId = props.entry.trade_id
    let userID = props.userID
    return axios.put(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades/shown`,
    {trade_id: tradeId, user_id: userID})
    .then((response) => {
      props.getInbox(userID)
      return axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades?user_id=${userID}`)
      .then((res) => {
        let data = res.data.filter((item, i) => {
          return (item.plant_offer.owner_id === userID) && (item.shown_to_user_offer === false)
        })
        let dataCount = data.length
        console.log('first array', data)
        let data2 = res.data.filter((item, i) => {
          return (item.plant_offer.owner_id !== userID) && ((item.shown_to_user_target === false) || (item.shown_to_user_target === null))
        })
        console.log('second array', data2)
        if (data.length.concat(data2.length) > 0) {
          setMessages(data.length.concat(data2.length));
        }
      })
      console.log('shown to user succesful', response)
    })
    .catch((err) => {
      console.log('Error in shown to user trade', err)
    })
  }

  let openMessage = () => {
    shownToUser()
    let tradeID = props.entry.trade_id
    console.log(tradeID)
    navigation.navigate('ChatMessages', {
      user_id: props.userID,
      trade_id: tradeID,
    });
    console.log('tradeId', props.entry.trade_id)
    console.log('plant_target', props.entry.plant_target)
    console.log('--------------------')
    console.log('plant_offer', props.entry.plant_offer)
  }

  return (

    <TouchableOpacity activeOpacity={0.6} onPress={openMessage}>
     <View style={styles.CardContainer}>
        {Boolean(props.entry.plant_offer.owner_id === props.userID) ?
          <>
            <Image
              style={styles.Image}
              source={{uri:props.entry.plant_offer.photo}}
            />
            <Entypo name="swap" size={24} color="black" style={{paddingLeft:6, paddingRight: 6}}/>
            <Image
                style={styles.Image}
                source={{uri:props.entry.plant_target.photo}}
             />
             </> :
                 <>
             <Image
                style={styles.Image}
                source={{uri:props.entry.plant_target.photo}}
              />
              <Entypo name="swap" size={24} color="black" style={{paddingLeft:6, paddingRight: 6}}/>
              <Image
                style={styles.Image}
                source={{uri:props.entry.plant_offer.photo}}//is curr user === ffer user render offer photo
              />
            </>
         }
          <View style={styles.TradeInfoContainer}>
          {Boolean(props.entry.plant_offer.owner_id !== props.userID) ? <View  >
              <Text style={{fontWeight: props.entry.shown_to_user_target === false  ?  'bold': 'normal'}}>{props.entry.plant_offer.username}</Text>
              <Text style={{  width:110,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: props.entry.shown_to_user_target === false  ?  'bold': 'normal'
                          }}
                              adjustsFontSizeToFit={true}
              >{props.entry.plant_offer.plant_name}</Text>
              {props.entry.pending  && <Text style={{fontWeight: props.entry.shown_to_user_target === false  ?  'bold': 'normal'}}>Pending</Text>}
              {props.entry.accepted && <Text style={{fontWeight: props.entry.shown_to_user_target === false ?  'bold': 'normal'}}>Accepted</Text>}
              {props.entry.accepted  === false && <Text style={{fontWeight: props.entry.shown_to_user_target === false ?  'bold': 'normal'}}>Declined</Text>}
            </View> :
            <View  >
            <Text style={{fontWeight: props.entry.shown_to_user_offer === false  ?  'bold': 'normal'}}>{props.entry.plant_target.username}</Text>
            <Text style={{  width:110,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: props.entry.shown_to_user_offer  === false ?  'bold': 'normal'
                        }}
                            adjustsFontSizeToFit={true}
            >{props.entry.plant_target.plant_name}</Text>
            {props.entry.pending  && <Text style={{fontWeight: props.entry.shown_to_user_offer === false ?  'bold': 'normal'}}>Pending</Text>}
            {props.entry.accepted && <Text style={{fontWeight: props.entry.shown_to_user_offer === false ?  'bold': 'normal'}}>Accepted</Text>}
            {props.entry.accepted  === false && <Text style={{fontWeight: props.entry.shown_to_user_offer === false ?  'bold': 'normal'}}>Declined</Text>}
          </View>}
          </View>
            {/* if user id === curr props.userID */}
            {props.entry.plant_target.owner_id === props.userID &&  props.currInbox === 'Pending' && <View style={styles.TradeIconsContainer}>
              <Ionicons name="md-checkbox-sharp" size={35} color="green" style={styles.TradeIcons} onPress={acceptTrade}/>
              <AntDesign name="closesquare" size={35} color="red" style={styles.TradeIcons} onPress={declineTrade}/>
        </View>}
        { props.currInbox !== 'Pending' && <View style={styles.Spacer}></View>}
        {props.entry.plant_target.owner_id !== props.userID && props.entry.pending && <View style={styles.WaitingSpacer}><Text>Waiting</Text></View>}

    </View>
    </TouchableOpacity>


  );
};


export default InboxList;
const styles = StyleSheet.create({
  Spacer: {
  paddingLeft: 46,
  paddingRight:46
  },
  WaitingSpacer: {
    paddingLeft: 21,
    paddingRight:20
    },
CardContainer: {
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 7,
  paddingBottom:7,
  alignItems: 'center',
  borderBottomColor: 'rgba(158, 150, 150, 1)',
  borderBottomWidth: 0.3,

},
Image: {
  borderColor:'#283618',
  width: 50,
  borderRadius: 400/2,
  height:50,
  margin: 1,
  borderWidth: 1
},
TradeInfo: {
  display: 'flex',
  flexDirection: 'column',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    flexFlow: 'row nowrap',
    alignItems: 'flex-start',

},
TradeInfoContainer: {
  display: 'flex',
  flexDirection: 'column',
  paddingTop: 3,
  paddingBottom:3,
  paddingLeft:14,

  // overflow: 'hidden',
  // textOverflow: 'ellipsis',
  // whiteSpace: 'nowrap',
  // flexFlow: 'row nowrap', /*change this*/
  // alignItems: 'flex-start', /*change this*/
  // borderWidth: 2
},
TradeIcons: {

  paddingLeft:4,
  paddingRight:4,
},
TradeIconsContainer: {
  display: 'flex',
  flexDirection: 'row',
  paddingLeft:4,
  paddingRight:4,
},
plantName: {
  // overflow: 'hidden',
  // borderWidth: 2,
  width:110,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  // overflowY:'auto'
},
})