import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { RefreshControl, Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView, Button } from 'react-native';
import InboxList from './InboxList.js'
import { AntDesign } from '@expo/vector-icons';
import TradesData from '../exampleData/InboxDummy.js';
import DummyAccepted from '../exampleData/InboxDummyAccpted.js'
import axios from 'axios'
import {  auth } from '../../../firebase.js'
import { usePlant } from '../../../TabNavigator.js';



const TradeInbox = (props) => {

  const [currInbox, setCurrInbox] = useState('Pending')
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation()
  const {pendingTrades, trades, acceptedTrades, userIdentity, userZipcode, getInbox, userMessages } = usePlant();
  const [userZip, setUserZip] = userZipcode;
  const [userId, setUserId] = userIdentity; //212 //317
  const [pendingData, setPendingData] = pendingTrades;
  const [tradesData, setTradesData] = trades;
  const [acceptedData, setAcceptedData] = acceptedTrades;
  const [messages, setMessages] = userMessages;

useEffect(() => {
  let num = 1;
  let interval = null
  clearInterval(interval)
  interval = setInterval(async () => {
    try {
      num++
      console.log(num);
      const notifResp = await axios.get(`http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/trades?user_id=${userId}`)
      let count = notifResp.data[0]?.notifications
      getInbox(userId)
      if (count > 0) {
        setMessages(count);
      } else {
        setMessages(null);
      }
    }
    catch { err =>
      console.log(err);
    }
  }, 5000)
}, [])

  let goBack = () => {
    navigation.goBack();
  }

  let switchTab = (tabName) => {
    setCurrInbox(tabName)
  }

  useEffect(() => {
    getInbox(userId)
  }, [currInbox])


  return (
    <View >
      <View >
        <View style={styles.InboxHeader}>
          {/* <AntDesign name="arrowleft" size={24} color="black" onPress={goBack}/> */}
        </View>
        <View style={styles.statusContainer}>
          <Button
            onPress={() => switchTab('Pending')}
            title="Pending"
            color="#606C38"
          />
          <Button
            onPress={() => switchTab('Accepted')}
            title="Accepted"
            color="#606C38"
          />
          <Button
            onPress={() => switchTab('History')}
            title="History"
            color="#606C38"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
        <View
          style={{
          borderBottomColor: 'grey',
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5
          }}
        />
      </View>
     <ScrollView  showsVerticalScrollIndicator={false} style ={styles.scroll} >
        <View style={styles.TradeContainer}>
        {currInbox === 'Pending' && <View style={styles.InboxEntryContainer}>
            {pendingData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              currInbox={currInbox}
              getInbox={getInbox}
              userID ={userId}
              />
            )}
          </View>
        }
        {currInbox === 'Accepted' && <View style={styles.InboxEntryContainer}>
            {acceptedData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              currInbox={currInbox}
              getInbox={getInbox}
              userID ={userId}
              />
            )}
          </View>
        }
          {currInbox === 'History' &&  <View style={styles.InboxEntryContainer}>
            {tradesData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              currInbox={currInbox}
              getInbox={getInbox}
              userID ={userId}
              />
            )}
            </View>
          }
        </View>
      </ScrollView>
    </View>
  );
}



const styles = StyleSheet.create({

  InboxHeader: {
    paddingTop:15  ,//60
    paddingLeft: 20,
    justifyContent: 'flex-start',
    // backgroundColor: '#CED89E',
  },

  header: {
    justifyContent: 'center',
    paddingBottom: 5,
    alignItems: 'center',

  },
  statusContainer: {
    justifyContent: 'space-evenly',
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,

  },
  InboxEntryContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 6,
    paddingBottom: 20,
    minWidth: '100%',
    maxHeight:'100%',
  },
  UserContainer: {
  textAlign: 'left',
  width: '100%',
  alignItems: 'flex-start',
  alignSelf: 'flex-start',
  paddingBottom: 5,
  },
  UserText: {
    fontSize: 12,
    paddingLeft:6
    },
    TradeContainer: {
      display: 'flex',
      flexDirection: 'column',

    },
    scroll: {
      height: '94%'

    },
});

export default TradeInbox;