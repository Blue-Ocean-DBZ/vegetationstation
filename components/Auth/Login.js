import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { loginUser, auth } from '../../firebase.js';
import { updateProfile, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'EditProfile' }],
        });
        //change this to Homepage when homepage component is made.
      }
    })
    return unsubscribe;
  }, [])

  const loginHandler = () => {
    loginUser(email, password)
    .then(()=>{
      navigation.reset({
        index: 0,
        routes: [{ name: 'Profile' }],
        //change this to Homepage when homepage component is made.
      });
    }).catch(err=> {
      alert('Your login credentials do not match.');
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={require('./placeholder/logo.png')}/>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder='Email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)}  keyboardType="email-address"/>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)}/>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.buttonGrp} onPress={loginHandler}>
            <Text style={styles.button}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonGrp} onPress={() => navigation.push('Register')}>
            <Text style={styles.button}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3D36',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputContainer: {
    width: '95%',
    padding: 14
  },
  input: {
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    fontSize: 16
  },
  buttonWrapper: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  buttonGrp: {
    width: '100%',
    borderRadius: 10,
    // overflow: 'hidden',
    marginBottom: 10
  },
  button: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#1B2722',
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '700',
    color: 'whitesmoke',
    overflow: 'hidden'
  },
  image: {
    width: 125,
    height: 125
  },
  label: {
    color: 'whitesmoke',
    paddingHorizontal: 7,
    fontSize: 16,
    marginTop: 10
  }
});

export default Login