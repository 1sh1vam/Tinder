import { Platform, SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';

const MessageScreen = () => {
  const { params } = useRoute();
  const { user } = useAuth();
  const { matchDetails } = params;

  const matchedUser = getMatchedUserInfo(matchDetails.users, user.uid);

  return (
    <SafeAreaView className="pt-8">
      <Header title={matchedUser.displayName} callEnabled />
    </SafeAreaView>
  )
}

export default MessageScreen

const styles = StyleSheet.create({})