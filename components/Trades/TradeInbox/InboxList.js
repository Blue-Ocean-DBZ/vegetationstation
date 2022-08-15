import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { Fontisto, Ionicons, AntDesign,Entypo } from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer';
const axios = require('axios')

const InboxList = (props) => {

  let acceptTrade = () => {
    var options = {
      recipients:
      ['set02@ymail.com'],
      subject: `Let's Trade!!`,
      body: 'Hello I am Goku and would like to trade plants with you!',
    }
    MailComposer.composeAsync(options);
    let promise = new Promise((resolve, reject) => {
      MailComposer.composeAsync(options)
        .then((result) => {
          resolve(result)
        })
        .catch((error) => {
          reject(error)
        })
      })
    promise.then(
      result => console.log(result.status),
      error => console.log(error.status)
     )

    console.log('Accepted')
    //Put request
    return axios.put('/plant/trades/accepted',//id in url
    { accepted: true, pending:false}
    )
    .then((response) => {
      console.log('Put succesful', response)
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

  return (
     <View style={styles.CardContainer}>
        <Image
          style={styles.Image}
          source={{uri:props.entry.user_photo}}//userPic
        />
        {/* <AntDesign name="swap" size={28} color="black" style={{paddingLeft:6, paddingRight: 6}}/> */}
        {/* <Fontisto name="arrow-swap" size={24} color="black" style={{paddingLeft:8, paddingRight: 8}}/> */}
        <Entypo name="swap" size={24} color="black" style={{paddingLeft:6, paddingRight: 6}}/>
        <Image
            style={styles.Image}
            source={{uri:props.entry.target_plant_photo}}//TargetuserPic
          />
          <View style={styles.TradeInfoContainer}>
          <View style={styles.TradeInfo}>
            <Text style={{fontWeight: 'bold'}}>{props.entry.target_userName}</Text>
            <Text style={styles.plantName} adjustsFontSizeToFit={true} >{props.entry.user_plant_name}</Text>
            {props.entry.pending && <Text>Pending</Text>}
            {props.entry.accepted && <Text>Accepted</Text>}
          </View>
          </View>
          {/* if user id === curr userid */}
        {props.entry.user_id === 1 &&<View style={styles.TradeIconsContainer}>
          {/* <Ionicons name="ios-checkbox" size={24} color="green" style={styles.TradeIcons}/> */}
           <Ionicons name="md-checkbox-sharp" size={35} color="green" style={styles.TradeIcons} onPress={acceptTrade}/>
          <AntDesign name="closesquare" size={35} color="red" style={styles.TradeIcons} onPress={declineTrade}/>
        </View>}
        {props.entry.user_id !== 1 &&<View style={styles.Spacer}>
        </View>}
    </View>
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
  paddingTop: 6,
  paddingBottom:6,
  alignItems: 'center',
},
Image: {
  borderColor:'#283618',
  width: 50,
  borderRadius: '50%',
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