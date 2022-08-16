import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image } from 'react-native';
import { createUser } from '../../firebase.js';

const Register = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = () => {
    createUser(email, password, username)
    // navigation.replace('EditProfile')
    navigation.reset({
      index: 0,
      routes: [{ name: 'EditProfile' }],
    });
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headerWrapper}>
          <Text style={styles.header}>Register</Text>
        </View>
        <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
          <TextInput placeholder='Username' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={username} style={styles.input} onChangeText={text => setUsername(text)}/>
          <Text style={styles.label}>Email</Text>
          <TextInput placeholder='Email'  placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)} keyboardType="email-address"/>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)}/>
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.buttonGrp} onPress={handleSignUp}>
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
    justifyContent: 'center',
    position: 'relative'
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
  label: {
    color: 'whitesmoke',
    paddingHorizontal: 7,
    fontSize: 16,
    marginTop: 10
  },
  headerWrapper: {
    position: 'absolute',
    paddingVertical: '40%',
    borderWidth: 1,
    width: '100%',
    height: '100%'
  },
  header: {
    fontSize: 40,
    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke'
  }
});

export default Register