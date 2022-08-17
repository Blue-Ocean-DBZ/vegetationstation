import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, TouchableOpacity, Keyboard, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import { updateProfile } from "firebase/auth";
import { createUser, auth } from '../../firebase.js';

const Register = () => {
  const navigation = useNavigation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validate = (email) => {
    const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase())
  }

  const handleSignUp = () => {
    if (!validate(email)) {
      alert('The email provided is not in the right format.');
      setIsLoading(false);
      return;
    }

    if(password.length < 5) {
      alert('Set a password with at least 6 characters.');
      return;
    }

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
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ImageBackground source={require('./placeholder/bg.png')} resizeMode="cover" style={styles.bg}>

          <View style={styles.inputContainer}>
            <Text style={styles.header}>Register</Text>
            <TextInput placeholder='Username' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={username} style={styles.input} onChangeText={text => setUsername(text)} textContentType="username" enablesReturnKeyAutomatically autoCorrect="false"/>
            <TextInput placeholder='Email' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={email} style={styles.input} onChangeText={text => setEmail(text)} keyboardType="email-address" textContentType="email" enablesReturnKeyAutomatically/>
            <TextInput placeholder='Password' placeholderTextColor='#D3D3D3' autoCapitalize='none' value={password} style={styles.input} secureTextEntry onChangeText={text => setPassword(text)} onSubmitEditing={handleSignUp} textContentType="password" enablesReturnKeyAutomatically/>
            <Text style={styles.notice}>By continuing, you agree to Vegetation Station's Terms of Service and acknowledge Vegetation Station's Privacy Policy.</Text>
            <TouchableOpacity style={isLoading ? styles.disabledWrapper : styles.registerBtnWrapper} onPress={handleSignUp} disabled={isLoading ? true : false}>
              <Text style={isLoading ? styles.disabledBtn : styles.registerBtn}>{isLoading ? 'Creating User..' : 'Register'}</Text>
            </TouchableOpacity>
          </View>

          <View styles={styles.haveaccount}>
            <Text style={styles.haveaccounttext}>Already have an account?</Text>
            <TouchableOpacity style={styles.buttonGrp} onPress={() => navigation.goBack()}>
              <Text style={styles.link}>Log In.</Text>
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
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    position: "relative",
    marginTop: 160
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
    color: 'whitesmoke',
    position: "absolute",
    top: -60,
    left: -20
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
  haveaccounttext: {
    marginTop: 21,
    color: "whitesmoke",
    alignSelf: 'center',
  },
  notice: {
    color: '#888',
    marginBottom: 14,
    paddingHorizontal: 7
  },
  disabledWrapper: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#888",
    borderRadius: 6,
  },
  disabledBtn: {
    color: "#333",
    fontSize: 16,
    fontWeight: "700"
  }
});

export default Register