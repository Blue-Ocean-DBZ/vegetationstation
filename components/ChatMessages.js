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
    let int = 0;
    let interval = null;
    clearInterval(interval);
    interval = setInterval(async () => {
      try {
        const response = await axios.get('http://ec2-54-173-95-78.compute-1.amazonaws.com:3000/messages', {params: {
          trade_id: trade_id,
        }})
        int++
        console.log('int',int)
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
        {console.log(user_id, trade_id)}
        <ImageBackground
          source={{uri:'https://pbs.twimg.com/media/Erp2ZjwXEAQbA4R.jpg'}}
          resizeMode="cover"
          style={styles.backgroundImg}
        >
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Text
          styles={styles.textButton}
          >⬅</Text>
        </TouchableOpacity>
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
    borderWidth: 3,
    borderColor: 'black',
    width: '70%',
    padding: 10,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#ADD8E6',
    marginTop: 1,
    marginBottom: 1,
  },
  chatBoxRight: {
    borderWidth: 3,
    borderColor: 'black',
    width: '70%',
    alignSelf: 'flex-end',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#90EE90',
    marginTop: 1,
    marginBottom: 1,
  },
  input: {
    width: '95%',
    borderWidth: 1,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'white',

  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    height: 40,
    width: '95%',
    alignSelf: 'center',
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
  backContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    zIndex: 3,
    justifyContent: 'center',
    top: 30,
    left: 10,

  },
  textButton: {
      fontSize: 100,
  },
  backgroundImg: {
    flex: 1,
  }
});

