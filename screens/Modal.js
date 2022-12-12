import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';

const Modal = () => {
  const { user } = useAuth();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [age, setAge] = useState(null);

  const incompleteForm = !(image && job && age);
  return (
    <View className="flex-1 items-center justify-between pb-10">
      <View>
      <Image className="w-[200px] h-[100px]" source={require('../assets/tinder-logo-full.png')} />
      <Text className="capitalize font-semibold text-gray-500 text-xl p-2">Welcome! {user.displayName}</Text>
      <Text className="text-red-400 font-bold text-center p-4">Step 1: The Profile Pic</Text>
      <TextInput onChangeText={(text) => setImage(text)} className="text-center text-xl pb-2" placeholder="Enter a Profile Pic URL" />

      <Text className="text-red-400 font-bold text-center p-4">Step 2: The Occupation</Text>
      <TextInput onChangeText={(text) => setJob(text)} className="text-center text-xl pb-2" placeholder="Enter your occupation" />

      <Text className="text-red-400 font-bold text-center p-4">Step 3: The Age</Text>
      <TextInput onChangeText={(text) => setAge(text)} className="text-center text-xl pb-2" placeholder="Enter the age" />
      </View>

      <Button disabled={incompleteForm} className={`rounded-xl w-64 p-3 ${incompleteForm ? 'bg-gray-400' : 'bg-red-400'}`}>
        <Text className="text-white font-bold text-xl text-center">Update Profile</Text>
      </Button>
    </View>
  )
}

export default Modal

const styles = StyleSheet.create({})