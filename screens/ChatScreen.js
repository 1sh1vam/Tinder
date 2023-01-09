import { SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header';

const ChatScreen = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" callEnabled />
    </SafeAreaView>
  )
}

export default ChatScreen;