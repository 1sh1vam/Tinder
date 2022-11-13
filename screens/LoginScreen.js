import { Button, View } from 'react-native'
import React from 'react';
import useAuth from '../hooks/useAuth';

const LoginScreen = () => {
  const { request, signInWithGoogle } = useAuth();
  return (
    <View>
      <Button disabled={!request} title="login" onPress={signInWithGoogle} />
    </View>
  )
}

export default LoginScreen;