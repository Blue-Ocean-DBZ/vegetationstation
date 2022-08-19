import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Button, ImageBackground } from 'react-native';
import { signOutUser } from '../firebase.js';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';
import { auth } from '../firebase.js';


export default function ChatMessages ({ route}) {
  const [message, setMessage] = useState('');
  const [actualMessages, setActualMessages] = useState([]);
  const [submitClick, setSubmitClick] = useState(0)


  useEffect(() => {
    let interval = null;
    clearInterval(interval);
    interval = setInterval(async () => {
      try {
        const response = await axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/messages', {params: {
          trade_id: trade_id,
        }})
        setActualMessages(response.data)
      }
      catch { err =>
        console.log(err);
      }
    }, 5000)

    return function cleanup() {clearInterval(interval)}
  }, []);

  useEffect(() => {
    axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/messages', {params: {
      trade_id: trade_id,
    }})
    .then((res) => {
      setActualMessages(res.data)
    })
    .catch((err) => console.log(err))
  }, [submitClick]);

  const navigation = useNavigation();

  const {user_id, trade_id} = route.params

  const addMessage = (e) => {
    e.preventDefault();
    axios.post('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/messages', {
      user_id: user_id,
      trade_id: trade_id,
      content: message,
    })
    .then(() => {
      let temp = submitClick + 1
      setSubmitClick(temp)
      setMessage(undefined)
    })
    .catch((err) => {
      console.log('post', err)
    })
  };

  const goBack = (e) => {
    e.preventDefault();
    navigation.goBack();
  }
  return (

      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ImageBackground
          source={{uri:'https://pbs.twimg.com/media/Erp2ZjwXEAQbA4R.jpg'}}
          resizeMode="cover"
          style={styles.backgroundImg}
        >
        <ScrollView>
          <View style={styles.msgContainer}>
        {actualMessages?.map((msg, i) => {
          if (msg.user_id === user_id) {
            return (
            <View key={'messageid' + i} style={styles.chatBoxRight}>
              <Text style={styles.userRight}>{msg.username}</Text>
              <Text style={styles.textRight}>{msg.content}</Text>
            </View>
            )
          } else {
            return (
            <View key={'messageid' + i} style={styles.chatBoxLeft}>
              <Text style={styles.userLeft}>{msg.username}</Text>
              <Text style={styles.textLeft}>{msg.content}</Text>
            </View>
            )
          }
        })}
          </View>
        </ScrollView>
        <View style={styles.submitMessages}>
          <TextInput
            style={styles.input}
            onChangeText={setMessage}
            value={message}
            placeholder="New message"
            keyboardType="default"
            multiline='true'
            onSubmitEditing={addMessage}
          />
          <TouchableOpacity
              style = {styles.submitButton}
              onPress = {addMessage}>
              <Text style = {styles.submitButtonText}> Submit </Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
  );
}

// styles need to be camel case (NO justify-content)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    height: '100%',
  },
  textRight: {
    height: 'auto',
    width: '100%',
    widthMin: '45%',
    textAlign: 'right',
  },
  textLeft: {
    height: 'auto',
    widthMax: '45%',
  },
  userRight: {
    height: 'auto',
    width: '100%',
    widthMin: '45%',
    textAlign: 'right',
    fontWeight: 'bold',
  },
  userLeft: {
    height: 'auto',
    widthMax: '45%',
    fontWeight: 'bold',
  },

  chatBoxLeft: {
    borderColor: 'black',
    width: '70%',
    padding: 10,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#f5f5f5',
    marginTop: 3,
    marginBottom: 3,
    marginLeft: 4
  },
  chatBoxRight: {
    borderColor: 'black',
    width: '70%',
    alignSelf: 'flex-end',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#90EE90',
    marginTop: 3,
    marginBottom: 3,
    marginRight: 4
  },
  input: {
    width: '95%',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5

  },
  submitButton: {
    borderWidth: 1,
    marginTop: 1,
    backgroundColor: "#2c3d36",
    padding: 10,
    height: 40,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5
  },
  submitButtonText:{
      color: 'white'
  },
  submitMessages: {
    position: 'fixed',
    bottom: '0%',
    width: '100%',
    alignSelf: 'center',
    height: '15%',
    justifyContent: 'center'
  },
  msgContainer: {
    top: '5%',
    width: '100%',
    padding: 5,
    height: '100%',
    overflow: 'auto',
    borderColor: 'black',
    overflow: 'scroll',
  },
  backgroundImg: {
    flex: 1,
  }
});