import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Input, Button } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { register } from "../services/authentication";
import Loader from "../services/loader";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const user = await register(email, password);
      if (user) {
        navigation.navigate("Home");
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("That email address is already in use!");
      } else if (error.code === "auth/invalid-email") {
        alert("That email address is invalid!");
      } else {
        alert(error);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleLogin = () => {
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your username"
        label="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={(text) => setUsername(text)}
        leftIcon={{ type: "material", name: "account-circle" }}
      />
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        autoCapitalize="none"
        onChangeText={(text) => setEmail(text)}
        leftIcon={{ type: "material", name: "email" }}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        leftIcon={{ type: "material", name: "lock" }}
        secureTextEntry
      />

      {loading ? (<Loader />) : (
      <>
      <Button
        title="Register"
        onPress={handleRegister}
        style={styles.btn} />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity> 
      </>) 
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    marginTop: 10,
  },
});
