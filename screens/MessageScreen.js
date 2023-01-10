import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';

const MessageScreen = () => {
  const { params } = useRoute();
  const { user } = useAuth();
  const { matchDetails } = params;

  console.log('math', matchDetails);
  const matchedUser = getMatchedUserInfo(matchDetails.users, user.uid);
  console.log('user matched', matchedUser);
  return (
    <View>
      <Text>MessageScreen</Text>
    </View>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})