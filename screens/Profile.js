// screens/Profile.js
import React from 'react';
import { View, Button, Text } from 'react-native';
import { useAuth0 } from '../auth/Auth0';

export default function Profile() {
  const { authState, login, logout } = useAuth0();

  return (
    <View>
      {authState.user ? (
        <View>
          <Text>Welcome, {authState.user.name}</Text>
          <Button title="Logout" onPress={logout} />
        </View>
      ) : (
        <Button title="Login" onPress={login} />
      )}
    </View>
  );
}
