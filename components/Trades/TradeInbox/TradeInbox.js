import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { Alert, Modal, StyleSheet, Text, Pressable, View, Image, useWindowDimensions, ScrollView, Button } from 'react-native';
import InboxList from './InboxList.js'
import { AntDesign } from '@expo/vector-icons';
import TradesData from '../exampleData/InboxDummy.js';
import DummyAccepted from '../exampleData/InboxDummyAccpted.js'


const TradeInbox = (props) => {
  const [currInbox, setCurrInbox] = useState(true)
  const [pendingData, setPendingData] = useState([])
  const [acceptedData, setAcceptedData] = useState([])
  const navigation = useNavigation()

  let removeTrade = (index) => {
    console.log(index)
    setPendingData(pendingData.filter((item, i) => i !== index));
  }

  useEffect (() => {
  setPendingData(TradesData)
  setAcceptedData(DummyAccepted)

  }, [])

  let goBack = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Modal' }],
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
          onPress={() => setCurrInbox(true)}
          title="Pending"
          color="#606C38"
        />
        <Button
          onPress={() => setCurrInbox(false)}
          title="Accepted"
          color="#606C38"
        />
        <Button
          onPress={() => console.log('History')}
          title="History"
          color="#606C38"
          accessibilityLabel="Learn more about this purple button"
        />

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
    {currInbox && <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TradeContainer}>
          <View style={styles.InboxEntryContainer}>
            {pendingData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              removeTrade={removeTrade}
              />
            )}
          </View>
        </View>
      </ScrollView>
      }
      {/* Accepted */}
     {!currInbox && <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.TradeContainer}>
          <View style={styles.InboxEntryContainer}>
            {acceptedData.map((entry, index = 0) =>
              <InboxList
              key={index}
              entry={entry}
              index={index}
              />
            )}
          </View>
        </View>
      </ScrollView>
     }
    </View>
  );
}



const styles = StyleSheet.create({

  InboxHeader: {
    paddingTop:30  ,//60
    paddingLeft: 20,
    justifyContent: 'start',
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