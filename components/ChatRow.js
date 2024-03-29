import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { getMatchedUserInfo } from '../lib/getMatchedUserInfo';
import useAuth from '../hooks/useAuth';
import Button from './Button';
import { useNavigation } from '@react-navigation/native';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [message, setMessage] = useState('Say Hi!!');
  const matchedUser = useMemo(
    () => getMatchedUserInfo(matchDetails.users, user.uid),
    []
  );

  useEffect(() => onSnapshot(
    query(
      collection(db, 'matches', matchDetails.id, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(1)
    ),
    (snapshot) => {
      setMessage(snapshot.docs[0]?.data().message || 'Say Hi!!')
    }
  ), [])

  return (
    <Button
      onPress={() => navigation.navigate('Message', { matchDetails })}
      style={styles.cardShadow}
      className="flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"
    >
      <Image
        className="w-16 h-16 rounded-full mr-4"
        source={{ uri: matchedUser.photoUrl }}
      />
      <View>
        <Text className="text-lg font-bold">{matchedUser.displayName}</Text>
        <Text>{message}</Text>
      </View>
    </Button>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
