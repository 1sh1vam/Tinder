import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAuth from '../hooks/useAuth';

const Modal = () => {
  const { user } = useAuth();
  return (
    <View className="flex-1 items-center">
      <Image className="w-[200px] h-[100px]" source={require('../assets/tinder-logo-full.png')} />
      <Text className="capitalize font-semibold text-gray-500 text-xl p-2">Welcome! {user.displayName}</Text>
    </View>
  )
}

export default Modal

const styles = StyleSheet.create({})