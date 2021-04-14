import React from "react";
import { Text, View, StyleSheet, TextInput, Image, TouchableOpacity } from "react-native";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  return (
    <View style={styles.background}>
      <Image style={styles.img} source={require('../../assets/logo.png')}/>
      <View style={styles.inputContainer}>
        <Feather name="user" style={styles.icon} color="#2E3191" />
        <TextInput style={styles.input} placeholder="username" autoCapitalize={false} autoCorrect={false}/>
      </View>
      <View style={styles.inputContainer}>
        <Ionicons name="key-outline" style={styles.icon} color="#2E3191" />
        <TextInput style={styles.input} placeholder="password" secureTextEntry={true} autoCapitalize={false} autoCorrect={false}/>
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={[styles.text, {fontSize: 20, alignSelf: 'center'}]}>Log in</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text>Don't have account? </Text>
        <TouchableOpacity>
          <Text style={styles.text}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  background: {
    //justifyContent: 'center', 
    flex:1, 
    paddingVertical: 20,
    marginHorizontal: 15,
  },
  img: {
    alignSelf: 'center',
    height: 300,
    width: 300,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    //borderWidth: 1,
    //backgroundColor:'blue',
    //marginHorizontal: 15,
    marginBottom: 7,
    borderWidth: 2,
    borderRadius: 7,
    backgroundColor: 'white',
    borderColor: '#2E3191'
  },
  input: {
    //borderWidth:2,
    //backgroundColor:'red',
    flex: 1,
    //borderRadius: 7,
    paddingHorizontal: 7,
    fontSize: 20,
    //backgroundColor:'white',
    //borderColor: '#2E3191'
  },
  icon: {
    fontSize: 40,
    marginHorizontal: 10,
    alignSelf: 'center',
  },
  btn: {
    //width: 120,
    height: 40,
    marginTop: 15,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor:'#edf6ff',
    borderColor: '#2E3191'
  },
  signupContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 15,
  },
  text: {
    fontWeight: 'bold', 
    color: '#171b84',
  }
})

export default LoginScreen;
