import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import { loginUser, auth } from '../../firebase.js';
import { updateProfile, onAuthStateChanged } from "firebase/auth";

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.displayName) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'TabNavigator' }],
        });
        //change this to Homepage when homepage component is made.
      }
    })
    return unsubscribe;
  }, [])

  const loginHandler = () => {
    setIsLoading(true);
    loginUser(email, password)
    .then(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'EditProfile' }],
        //change this to Homepage when homepage component is made.
      });
      setIsLoading(false);
    }).catch(err => {
      alert('Your login credentials do not match.');
      setIsLoading(false);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={styles.mainContainer}>
      <KeyboardAvoidingView style={styles.container}>
        <ImageBackground source={require('./placeholder/bg.png')} resizeMode="cover" style={styles.bg}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={require('./placeholder/logo.png')} />
            <Text style={styles.header}>Vegetation Station</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder='Email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)} keyboardType="email-address" />
            <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)} />
            <TouchableOpacity style={styles.loginBtnWrapper} onPress={loginHandler} disabled={isLoading ? true : false}>
              <Text style={styles.loginBtn}>Login</Text>
            </TouchableOpacity>
          </View>
          <View styles={styles.noaccount}>
            <Text style={styles.noaccounttext}>Don't have an account?</Text>
            <TouchableOpacity style={styles.buttonGrp} onPress={() => navigation.push('Register')}>
              <Text style={styles.link}>Sign Up.</Text>
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
  imageWrapper: {
    alignItems: "center",
    width: "120%",
    marginVertical: 40
  },
  image: {
    width: 125,
    height: 125
  },
  header: {
    fontSize: 21,
    fontWeight: '700',
    paddingHorizontal: 30,
    color: 'whitesmoke'
  },
  link: {
    color: "whitesmoke",
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  noaccounttext: {
    marginTop: 21,
    color: "whitesmoke",
    alignSelf: 'center',
  },
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginBtnWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#BC6C25",
    borderRadius: 6,

  },
  loginBtn: {
    color: "#FFE7D2",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default Login