import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo'
import useAuth from '../hooks/useAuth'

const ChatRow = ({ matchDetails }) => {
  const { user } = useAuth();
  const matchedUser = useMemo(() => getMatchedUserInfo(matchDetails.users, user.uid), []);

  console.log('matched user', matchedUser);
  return (
    <View>
      <Text>ChatRow</Text>
    </View>
  )
}

export default ChatRow

const styles = StyleSheet.create({})