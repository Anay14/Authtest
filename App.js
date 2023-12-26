// App.js
import React from 'react';
import { Auth0Provider, useAuth0 } from './auth/Auth0';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Trips from './screens/Trips';
import Profile from './screens/Profile';
import LoadingScreen from './screens/LoadingScreen';

import LoginScreen from './screens/LoginScreen';
// import SignupScreen from './screens/SignupScreen'; // if you have a separate signup screen


const Tab = createBottomTabNavigator();

function MainApp() {
  const { authState } = useAuth0();

  if (authState.isLoading) {
    return <LoadingScreen />;
  }

  if (!authState.user) {
    // Replace with your login screen
    return <LoginScreen />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trips" component={Trips} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Auth0Provider>
      <NavigationContainer>
        <MainApp />
      </NavigationContainer>
    </Auth0Provider>
  );
}
