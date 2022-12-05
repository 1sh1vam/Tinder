import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5">
        <Button onPress={logout}>
          <Image className="w-10 h-10 rounded-full" source={{ uri: user.photoURL }} />
        </Button>
        <Button>
          <Image className="w-14 h-14 rounded-full" source={require('../assets/tinder-logo.png')} />
        </Button>
        <Button onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </Button>
      </View>
      <Text className="text-red-500 mt-10">HomeScreen</Text>
    </SafeAreaView>
  )
}

export default HomeScreen;