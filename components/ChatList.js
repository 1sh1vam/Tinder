import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useAuth from '../hooks/useAuth';

const ChatList = () => {
  const [matches, setMatches] = useState([]);
  const { user } = useAuth();

  useEffect(() => onSnapshot(
      query(
        collection(db, 'matches'),
        where('userMatched', 'array-contains', user.uid)
      ),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((document) => ({ ...document, id: document.id }))
        );
      }
    ), [])

  return matches.length ? (
    <View>
      <Text>ChatList</Text>
    </View>
  ) : (
    <View className="p-5">
      <Text className="text-center text-lg">No matches so far 🙂</Text>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})