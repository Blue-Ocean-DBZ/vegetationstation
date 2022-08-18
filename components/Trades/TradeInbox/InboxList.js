import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
// import * as MailComposer from 'expo-mail-composer';
const axios = require('axios')
import ImageModal from 'react-native-image-modal';
import { useNavigation } from '@react-navigation/core'

const InboxList = (props) => {
  console.log('shown to usdsfsfsfsfdsdfsder', props.userID)
  const navigation = useNavigation();

  let acceptTrade = () => {
      console.log('Accepted')
      let tradeId = props.entry.trade_id
      let userID = props.userID
      console.log(userID)
      return axios.put(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades`,
      {trade_id: tradeId, user_id: userID, accepted: true})
    // return axios.put(`http://localhost:3000/trades?trade_id=${tradeId}&accepted=true`)
    .then((response) => {
      props.getInboxData()
      console.log('Put succesful', response)
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
    // return axios.put(`http://localhost:3000/trades?trade_id=${tradeId}&accepted=false`)
    .then((response) => {
      props.getInboxData()
      console.log('trade declined Accepted switched to false', response)
    })
    .catch((err) => {
      console.log('Error in decline trade', err)
    })
  }

  let openMessage = () => {
    console.log('tradeId', props.entry.trade_id)
    console.log('plant_target', props.entry.plant_target)
    console.log('--------------------')
    console.log('plant_offer', props.entry.plant_offer)
    let tradeID = props.entry.trade_id
    // navigation.push('ChatMessages')
    navigation.navigate('ChatMessages', {
      user_id: 212,
      trade_id: tradeID,
    });
    // let tradeId = props.entry.trade_id
  //   return axios.put(`http://localhost:3000/trades?trade_id=${tradeId}&shown_to_user=true`)
  //   .then((response) => {
  //     props.getInboxData()
  //   })
  //   .catch((err) => {
  //     console.log('Error in decline trade', err)
  //   })
  }

  return (

    <TouchableOpacity activeOpacity={0.6} onPress={openMessage}>
     <View style={styles.CardContainer}>
        {Boolean(props.entry.plant_offer.owner_id === props.userID) ?
          <>
            <Image
              style={styles.Image}
              source={{uri:props.entry.plant_offer.photo}}//is curr user === ffer user render offer photo
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
              <Text style={{fontWeight: props.entry.shown_to_user_target   ?  'bold': 'normal'}}>{props.entry.plant_offer.username}</Text>
              <Text style={{  width:110,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontWeight: props.entry.shown_to_user_target   ?  'bold': 'normal'
                          }}
                              adjustsFontSizeToFit={true}
              >{props.entry.plant_offer.plant_name}</Text>
              {props.entry.pending  && <Text style={{fontWeight: props.entry.shown_to_user_target === false  ?  'bold': 'normal'}}>Pending</Text>}
              {props.entry.accepted && <Text style={{fontWeight: props.entry.shown_to_user_target === false ?  'bold': 'normal'}}>Accepted</Text>}
              {props.entry.accepted  === false && <Text style={{fontWeight: props.entry.shown_to_user_target === false ?  'bold': 'normal'}}>Declined</Text>}
            </View> :
            <View  >
            <Text style={{fontWeight: props.entry.shown_to_user_offer   ?  'bold': 'normal'}}>{props.entry.plant_target.username}</Text>
            <Text style={{  width:110,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            fontWeight: props.entry.shown_to_user_offer   ?  'bold': 'normal'
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
    flexFlow: 'row nowrap', /*change this*/
    alignItems: 'flex-start', /*change this*/

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