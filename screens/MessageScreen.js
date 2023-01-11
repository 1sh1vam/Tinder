import {
  FlatList,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Button from '../components/Button';

const MessageScreen = () => {
  const { params } = useRoute();
  const { user } = useAuth();
  const { matchDetails } = params;

  const [input, setInput] = useState('');

  const matchedUser = getMatchedUserInfo(matchDetails.users, user.uid);

  const handleSendMessage = () => {
    setInput('');
  }

  return (
    <SafeAreaView className="pt-8 flex-1">
      <Header title={matchedUser.displayName} callEnabled />
      <KeyboardAvoidingView className="flex-1" keyboardVerticalOffset={10}>
        <FlatList
          className="flex-1"
        />
        <View className="flex-row bg-white justify-between items-center border border-gray-200 px-5 py-2">
          <TextInput
            placeholder="Send Message..."
            className="text-lg h-10 w-9/12"
            value={input}
            onSubmitEditing={handleSendMessage}
            onChange={setInput}
          />
          <Button onPress={handleSendMessage}>
            <Text className="text-red-500 text-lg">Send</Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
