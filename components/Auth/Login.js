import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView,TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { loginUser } from '../../firebase.js';

const Login = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const loginHandler = () => {
    loginUser(email, password);
    // uncomment when homepage is made
    // navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Homepage' }],
    // });
    alert('logged in');
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder='email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)}/>
          <TextInput placeholder='password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)}/>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    padding: 14
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    height: 50,
    borderWidth: 1,
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
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    fontSize: 20,
    fontWeight: '700',
    borderWidth: 1,
  }
});

export default Login