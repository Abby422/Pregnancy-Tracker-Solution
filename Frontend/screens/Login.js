import {  KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Input, Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Loader from '../services/loader'
import { signIn } from '../services/authentication'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

    
    const handleLogin = async() => {
        setLoading(true)
        try {
          const user = await signIn(email, password);
          if (user) {
            navigation.navigate("Home");
          }
        } catch (error) {
          if (error.code === "auth/invalid-email") {
            alert("That email address is invalid!");
          } else if (error.code === "auth/user-not-found") {
            alert("That email address is not found!"); 
          } else if (error.code === "auth/wrong-password") {
            alert("That password is incorrect!");
          } else {
            alert(error);
          }
          alert("Login in failed" + error.message);
        } finally {
          setLoading(false)
        }
    }

    const handleRegister = async() => {
        navigation.navigate("Register");
    }

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView behavior="padding" >
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        leftIcon={{ type: 'material', name: 'email' }}    
        
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        leftIcon={{ type: 'material', name: 'lock' }}
        secureTextEntry
      />
      {
        loading ? <Loader /> :
        <>
          <Button title="Login" onPress={handleLogin} />

          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.btn}>Register</Text>
          </TouchableOpacity>
        </>
      }
    </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    btn: {
        marginTop: 10,
    }
})