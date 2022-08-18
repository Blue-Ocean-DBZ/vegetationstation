import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TouchableWithoutFeedback, TextInput, Keyboard, ScrollView, KeyboardAvoidingView, Button, ImageBackground } from 'react-native';
import { signOutUser } from '../firebase.js';
import { useNavigation } from '@react-navigation/core'

export default function ChatMessages () {
  const [message, setMessage] = useState(undefined);
  const [fakeMessages, setFakeMessages] = useState([
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'ur a saiyan'
    },
    {
      user1: 'goku',
      user2: 'vegeta',
      message: 'nuh uh'
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'yuh huh'
    },
    {
      user1: 'goku',
      user2: 'vegeta',
      message: 'ur a saiyan'
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'no, im a saiyan prince',
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'A SAIYANS PRIDE',
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'A SAIYANS PRIDE',
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'A SAIYANS PRIDE',
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'A SAIYANS PRIDE',
    },
    {
      user1: 'vegeta',
      user2: 'goku',
      message: 'A SAIYANS PRIDE',
    }
  ])

  const navigation = useNavigation();

  const addMessage = (e) => {
    e.preventDefault();
    setFakeMessages([...fakeMessages, {
      user1: 'vegeta',
      user2: 'goku',
      message: message,
    }])
    setMessage(undefined)
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
        <TouchableOpacity style={styles.backContainer} onPress={goBack}>
          <Text styles={styles.textButton}> X </Text>
        </TouchableOpacity>
        <ScrollView>
          <View style={styles.msgContainer}>
        {fakeMessages?.map((msg, i) => {
          if (msg.user1 === 'vegeta') {
            return (
            <View key={'messageid' + i} style={styles.chatBoxRight}>
              <Text style={styles.textRight}>{msg.user1}</Text>
              <Text style={styles.textRight}>{msg.message}</Text>
            </View>
            )
          } else {
            return (
            <View key={'messageid' + i} style={styles.chatBoxLeft}>
              <Text style={styles.textLeft}>{msg.user1}</Text>
              <Text style={styles.textLeft}>{msg.message}</Text>
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
  chatBoxLeft: {
    borderWidth: 3,
    borderColor: 'black',
    width: '45%',
    padding: 10,
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#ADD8E6',
  },
  chatBoxRight: {
    borderWidth: 3,
    borderColor: 'black',
    width: '45%',
    alignSelf: 'flex-end',
    padding: 10,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#90EE90',
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
    position: 'absolute',
    bottom: '0%',
    width: '100%',
    alignSelf: 'center',
    height: '15%',
    justifyContent: 'center'
  },
  msgContainer: {
    width: '100%',
    padding: 5,
    height: '65%',
    overflow: 'auto',
  },
  backContainer: {
    position: 'absolute',
    height: 50,
    width: 50,
    backgroundColor: 'white',
    zIndex: 1,
    justifyContent: 'center',
    top: 20,
  },
  textButton: {
    height: 'auto',
    width: '50%',
    textAlign: 'center',
  },
  backgroundImg: {
    flex: 1,
  }
});

