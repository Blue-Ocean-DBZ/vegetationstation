import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
// import * as MailComposer from 'expo-mail-composer';
const axios = require('axios')

const InboxList = (props) => {
  console.log(props.entry.offer.owner_id)
  let acceptTrade = () => {
    console.log('Accepted')
    let tradeId = props.entry.trade_id
    return axios.put(`http://localhost:3000/trades?trade_id=${tradeId}&accepted=true`,
    { "accepted": true}
    )
    .then((response) => {
      //Get Request for all inbox data
      console.log('Put succesful', response)
    })
    .then((data) => {
      props.getInboxData()
      console.log('hello')
    })
    .catch((err) => {
      console.log('Accept trade did not work', err)
    })
      //change pending to false
      //change accepted to true
     //get data
  }

  let declineTrade = () => {
    console.log('Declined')
    props.removeTrade(props.index)
    //delete request
    return axios.delete('/plants/trades/delete',//id in query url
      {data: {id: props.tradeId}}
    )
    .then((response) => {
      console.log('trade Deleted in decline trade', response)
    })
    .catch((err) => {
      console.log('Error in decline trade', err)
    })
      //delete trade by trade id
    //get data
  }
  let openMessage = () => {
    console.log('open message page')
  }

  return (
    <TouchableOpacity activeOpacity={0.6} onPress={openMessage}>
     <View style={styles.CardContainer}>
        <Image
          style={styles.Image}
          source={{uri:props.entry.offer.photo}}//userPic
        />
        {/* <AntDesign name="swap" size={28} color="black" style={{paddingLeft:6, paddingRight: 6}}/> */}
        {/* <Fontisto name="arrow-swap" size={24} color="black" style={{paddingLeft:8, paddingRight: 8}}/> */}
        <Entypo name="swap" size={24} color="black" style={{paddingLeft:6, paddingRight: 6}}/>
        <Image
            style={styles.Image}
            source={{uri:props.entry.target.photo}}
          />
          <View style={styles.TradeInfoContainer}>
            <View style={styles.TradeInfo} style={{fontWeight: props.entry.shown_to_user  ?  'normal': 'bold'}}>
              <Text >Goku</Text>{/* add username to get request */}
              <Text style={styles.plantName} adjustsFontSizeToFit={true} >Rose</Text>{/*add target plant name to request*/}
              {props.entry.pending === false && <Text>Pending</Text>}
              {props.entry.accepted === true && <Text>Accepted</Text>}
            </View>
          </View>
            {/* if user id === curr userid */}
            {props.entry.offer.owner_id === 3 &&  props.currInbox === 'Pending' && <View style={styles.TradeIconsContainer}>
              <Ionicons name="md-checkbox-sharp" size={35} color="green" style={styles.TradeIcons} onPress={acceptTrade}/>
              <AntDesign name="closesquare" size={35} color="red" style={styles.TradeIcons} onPress={declineTrade}/>
        </View>}
        {props.entry.offer.owner_id !== 3 && <View style={styles.Spacer}>
        </View>}
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
CardContainer: {
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 7,
  paddingBottom:7,
  alignItems: 'center',
},
Image: {
  borderColor:'#283618',
  width: 50,
  borderRadius: 400/2,
  height:50,
  margin: 1,
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
  textOverflow: 'ellipsis'

  // overflowY:'auto'
},
})