import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo'
import useAuth from '../hooks/useAuth'
import Button from './Button'

const ChatRow = ({ matchDetails }) => {
  const { user } = useAuth();
  const matchedUser = useMemo(() => getMatchedUserInfo(matchDetails.users, user.uid), []);

  return (
    <Button style={styles.cardShadow} className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg">
        <Image
            className="w-16 h-16 rounded-full mr-4"
            source={{ uri: matchedUser.photoUrl }}
        />
        <View>
            <Text className="text-lg font-bold">{matchedUser.displayName}</Text>
            <Text>Say hi!!</Text>
        </View>
    </Button>
  )
}

export default ChatRow

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2
    }
})