import { Button, ImageBackground, Pressable, SafeAreaView, Text } from 'react-native'
import React from 'react';
import useAuth from '../hooks/useAuth';
import { styled } from 'nativewind';

const StyledImageBackground = styled(ImageBackground);
const StyledPressable = styled(Pressable);

const LoginScreen = () => {
  const { request, signInWithGoogle } = useAuth();
  return (
    <StyledImageBackground className="flex-1" source={require('../assets/tinder.png')}>
    <SafeAreaView className="flex-1 justify-end">
        <StyledPressable disabled={!request} onPress={signInWithGoogle} className="bg-white mb-[140px] rounded-full px-4 py-3 w-52 mx-auto active:opacity-50 disabled:opacity-30">
          <Text className="text-center font-semibold">Signin & get swiping</Text>
        </StyledPressable>
    </SafeAreaView>
    </StyledImageBackground>
  )
}

export default LoginScreen;