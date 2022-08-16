import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import { updateProfile } from "firebase/auth";
import { createUser, auth } from '../../firebase.js';

const Register = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignUp = () => {
    setIsLoading(true);
    createUser(email, password, username)
      .then(userCredentials => {
        updateProfile(auth.currentUser, {
          displayName: username
        })
        setTimeout(() => {
          navigation.reset({
          index: 0,
          routes: [{ name: 'EditProfile' }],
          })
          setIsLoading(false)
        }, 500);

      })
      .catch(err => {
        alert("Your email has already been registered.")
        setIsLoading(false);
      })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
      <ImageBackground source={require('./placeholder/bg.png')} resizeMode="cover" style={styles.bg}>
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
          <TouchableOpacity style={styles.registerBtnWrapper} onPress={handleSignUp} disabled={isLoading ? true:false}>
            <Text style={styles.registerBtn}>Register</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3D36',
    justifyContent: 'center',
    width: "100%",
  },
  inputContainer: {
    width: '95%',
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 12,
    backgroundColor: '#F5F5F5'
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    borderRadius: 6,
    height: 50,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    fontSize: 16,
    marginBottom: 14
  },
  headerWrapper: {
    position: 'absolute',
    paddingVertical: '60%',
    borderWidth: 1,
    width: '100%',
    height: '100%'
  },
  header: {
    fontSize: 40,
    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke'
  },
  registerBtnWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#BC6C25",
    borderRadius: 6,
  },
  registerBtn: {
    color: "#FFE7D2",
    fontSize: 16,
    fontWeight: "700"
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  link: {
    color: "whitesmoke",
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
});

export default Register