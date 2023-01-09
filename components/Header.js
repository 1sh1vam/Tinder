import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons, Foundation } from '@expo/vector-icons';
import Button from './Button';

const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center justify-between p-2">
      <View className="flex-row items-center">
        <Button onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back-outline" size={34} color="#FF5864" />
        </Button>
        <Text className="text-2xl font-bold pl-2">{title}</Text>
      </View>
      {callEnabled && (
        <Button className="rounded-full m4-4 p-3 bg-red-200">
          <Foundation name="telephone" size={20} color="red" />
        </Button>
      )}
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})