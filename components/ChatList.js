import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useAuth from '../hooks/useAuth';

const ChatList = () => {
  const [matches, setMatches] = useState();
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, 'matches'),
        where('userMatched', 'array-contains', user.uid)
      ),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((document) => ({ ...document, id: document.id }))
        );
      }
    );
  }, [])

  console.log('matches', matches);
  return (
    <View>
      <Text>ChatList</Text>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})