import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiverMessage = ({ prevMsgByReceiver, message, photoUrl }) => {
  return (
    <View className={`flex-row gap-3 items-center mx-3 my-2 ${prevMsgByReceiver ? 'ml-[72px]': ''}`}>
      {!prevMsgByReceiver && <Image
        className="w-12 h-12 rounded-full"
        source={{ uri: photoUrl }}
      />}
      <View className={`bg-red-400 rounded-lg ${!prevMsgByReceiver ? 'rounded-tl-none' : ''} px-5 py-3`}>
        <Text className="text-white">{message}</Text>
      </View>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({})