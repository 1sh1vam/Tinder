import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import Header from '../components/Header';
import Button from '../components/Button';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import SenderMessage from '../components/SenderMessage';
import ReceiverMessage from '../components/ReceiverMessage';

const MessageScreen = () => {
  const { params } = useRoute();
  const { user } = useAuth();
  const { matchDetails } = params;

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const matchedUser = getMatchedUserInfo(matchDetails.users, user.uid);

  useEffect(() => onSnapshot(
    query(
      collection(db, 'matches', matchDetails.id, 'messages'),
      orderBy('createdAt', 'desc')
    ),
    (snapshot) => {
      setMessages(snapshot.docs.map((document) => ({ ...document.data(), id: document.id })))
    }
  ), [])

  const handleSendMessage = () => {
    if (!input) return;
    addDoc(collection(db, 'matches', matchDetails.id, 'messages'), {
      uId: user.uid,
      message: input,
      photoUrl: matchDetails.users[user.uid].photoUrl,
      createdAt: serverTimestamp(),
    });
    setInput('');
  }

  return (
    <SafeAreaView className="pt-8 flex-1">
      <Header title={matchedUser.displayName} callEnabled />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={10}
      >
        <FlatList
          className="flex-1"
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item: message }) =>
            message.uId === user.uid ? (
              <SenderMessage {...message} />
            ) : (
              <ReceiverMessage {...message} />
            )
          }
        />
        <View className="flex-row bg-white justify-between items-center border border-gray-200 px-5 py-2">
          <TextInput
            placeholder="Send Message..."
            className="text-lg h-10 w-9/12"
            value={input}
            onSubmitEditing={handleSendMessage}
            onChangeText={setInput}
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
