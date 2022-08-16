import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView, Button } from 'react-native';
import InboxList from './InboxList.js'
import { AntDesign } from '@expo/vector-icons';
import TradesData from '../exampleData/InboxDummy.js';
import DummyAccepted from '../exampleData/InboxDummyAccpted.js'
import axios from 'axios'


const TradeInbox = (props) => {
  const [currInbox, setCurrInbox] = useState('Pending')
  const [pendingData, setPendingData] = useState([])
  const [tradesData, setTradesData] = useState([])
  const [acceptedData, setAcceptedData] = useState([])
  const navigation = useNavigation()

  let removeTrade = (index) => {
    console.log(index)
    setPendingData(pendingData.filter((item, i) => i !== index));
  }

  let getInboxData = () => {
    axios.get('http://localhost:3000/trades?user_id=1')
    .then((response) => {
        // console.log(response.data)
        let x = response.data.map(function(obj){
          return obj.tradesobj
        })
        // console.log(x, ' this is your obj')
        setTradesData(x)
        return x
    })
    .then((response) => {
      // console.log(response.data)
      let data = response.filter((item, i) => {
        return item.pending === false
      })
      setPendingData(data);
      return response
  })
  .then((response) => {
    // console.log(pendingData,'slhfdkjasgfasfjsahgdf')
    let accepted = response.filter((item, i) => {
      return item.accepted === true
    })

    setAcceptedData(accepted);
    return response
    // setAcceptedData(tradesData.filter((item, i) => item.accepted == true));
})
    .catch((err) => {
      console.log(err, 'this is your error')
    })
  }



  useEffect (() => {

  getInboxData()
  }, [])


  let goBack = () => {
    console.log("back")
    navigation.reset({
      index: 0,
      routes: [{ name: 'TabNavigator' }],
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <View style={styles.InboxHeader}>
        <AntDesign name="arrowleft" size={24} color="black" onPress={goBack}/>
      </View>
        <View style={styles.statusContainer}>
          <Button
            onPress={() => setCurrInbox('Pending')}
            title="Pending"
            color="#606C38"
          />
          <Button
            onPress={() => setCurrInbox('Accepted')}
            title="Accepted"
            color="#606C38"
          />
          {/* <Button
            onPress={() => setCurrInbox('History')}
            title="History"
            color="#606C38"
            accessibilityLabel="Learn more about this purple button"
          /> */}
        </View>
        <View
          style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5
          }}
        />
    </View>
    {/* pending  */}
     <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TradeContainer}>
        {currInbox === 'Pending' && <View style={styles.InboxEntryContainer}>
            {pendingData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              currInbox={currInbox}
              removeTrade={removeTrade}
              getInboxData={getInboxData}
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
              getInboxData={getInboxData}
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
              getInboxData={getInboxData}
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
    paddingTop:50  ,//60
    paddingLeft: 20,
    justifyContent: 'flex-start',
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
});

export default TradeInbox;