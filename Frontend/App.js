import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Login from "./screens/Login";
import Register from "./screens/Register";
import CommunityScreen from "./screens/CommunityScreens"; 
import Home from "./screens/Home";
import { getAuth } from "firebase/auth";
import app from "./services/firebase";

const Stack = createNativeStackNavigator();
const auth = getAuth(app);
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState(null);
const Tab = createBottomTabNavigator();
const screenOptionStyle = {
  headerShown: false,
}

// Handle user state changes
const onAuthStateChangedHandler = (user) => {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const unSubscriber = auth.onAuthStateChanged(auth, onAuthStateChangedHandler);
  return unSubscriber; // unsubscribe on unmount
});

if (initializing) {() => {return null}}

const MainStack = () => (
  <Stack.Navigator screenOption={screenOptionStyle}>
    <Stack.Screen name="Home" component={Home}>
      <Tab.Navigator>
        <Tab.Screen name="Community" component={CommunityScreen} />
      </Tab.Navigator>
    </Stack.Screen>
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOption={screenOptionStyle}>
        {user ? (
          <Stack.Screen name="Main" component={MainStack} />
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
