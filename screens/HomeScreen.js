import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';
import { db } from '../lib/firebase';
import { collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { androidSafeArea } from '../styles/common-styles';

const DUMMY_DATA = [
  {
    id: 1,
    firstName: 'Shivam',
    lastName: 'Mishra',
    occupation: 'Software Developer',
    age: 20,
    photoUrl: 'https://media-exp1.licdn.com/dms/image/D4D03AQFjRCv6pz_9BQ/profile-displayphoto-shrink_800_800/0/1667375707614?e=1675900800&v=beta&t=KElypcsMBGEqZ3YdpZp6jojxIL21RbiRhWIrVDZqZDc',
  },
  {
    id: 2,
    firstName: 'Alina',
    lastName: 'Petrenko',
    occupation: 'Jr Software Developer',
    age: 22,
    photoUrl: 'https://media-exp1.licdn.com/dms/image/C4D03AQFeeppLL-Z8sA/profile-displayphoto-shrink_100_100/0/1663842768513?e=1675900800&v=beta&t=_-XYBP_K6IXr-cCdsOKfJGV2V2WQgRMUdftmBmit6m8',
  },
  {
    id: 3,
    firstName: 'Anusha',
    lastName: 'Mishra',
    occupation: 'Software Engineer',
    age: 23,
    photoUrl: 'https://media-exp1.licdn.com/dms/image/C5603AQFGriJFWAbUTA/profile-displayphoto-shrink_100_100/0/1629177887768?e=1675900800&v=beta&t=RpBJQ_j3qSFqCnmzYieOWfPSXevheUXWteN4EiSkQd0',
  },
]

const HomeScreen = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  useLayoutEffect(() => onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
    if (!snapshot.exists()) navigation.navigate('Modal');
  }), []);

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passesSnap = await getDocs(collection(db, 'users', user.uid, 'passes'));
      const passesIds = passesSnap.empty ? ['test'] : passesSnap.docs.map((document) => document.id);
      const swipedSnap = await getDocs(collection(db, 'users', user.uid, 'swipes'));
      const swipedIds = swipedSnap.empty ? ['test'] : swipedSnap.docs.map((document) => document.id);
      unsub = onSnapshot(query(collection(db, 'users'), where('id', 'not-in', [ ...passesIds, ...swipedIds ])), snapshot => {
        setProfiles(snapshot.docs.filter(doc => doc.id !== user.uid).map((doc) => ({ ...doc.data() })))
      })
    }

    fetchCards();
    return unsub;
  }, []);

  const swipeLeft = async (userIndex) => {
    const userSwiped = profiles[userIndex];

    if (!userSwiped) return;

    return setDoc(doc(db, 'users', user.uid, 'passes', userSwiped.id), userSwiped);
  }

  const swipeRight = async (userIndex) => {
    const userSwiped = profiles[userIndex];

    if (!userSwiped) return;

    return setDoc(doc(db, 'users', user.uid, 'swipes', userSwiped.id), userSwiped);
  }

  return (
    <SafeAreaView style={androidSafeArea} className="flex-1">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5">
        <Button onPress={logout}>
          <Image className="w-10 h-10 rounded-full" source={{ uri: user.photoURL }} />
        </Button>
        <Button onPress={() => navigation.navigate('Modal')}>
          <Image className="w-14 h-14 rounded-full" source={require('../assets/tinder-logo.png')} />
        </Button>
        <Button onPress={() => navigation.navigate('ChatScreen')}>
          <Ionicons name="chatbubbles-sharp" size={30} color="#FF5864" />
        </Button>
      </View>

      {/* Card */}
      <View className="flex-1 mt-6">
        <Swiper
          containerStyle={{ backgroundColor: 'transparent' }}
          cards={profiles}
          ref={swipeRef}
          cardVerticalMargin={0}
          onSwipedLeft={swipeLeft}
          onSwipedRight={swipeRight}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          overlayLabels={{
            left: {
              title: 'Eww! Sorry😔',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red'
                }
              }
            },
            right: {
              title: 'MATCH 😍',
              style: {
                label: {
                  textAlign: 'left',
                  color: 'green'
                }
              }
            }
          }}
          renderCard={(card) => card ? (
            <View key={card.id} className="bg-white h-[60%] rounded-xl">
              <Image className="w-full h-full rounded-t-xl" source={{ uri: card.photoUrl }} />
              <View style={styles.cardShadow} className="flex-row justify-between px-6 py-2 bg-white rounded-b-xl h-20">
                <View>
                  <Text className="text-xl font-bold">{card.displayName}</Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text className="text-2xl font-bold">{card.age}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.cardShadow} className="bg-white h-[60%] rounded-xl justify-center items-center">
              <Text className="font-bold mb-5">No more profiles</Text>
              <Image className="w-20 h-20" source={{ uri: 'https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Sad-Face-Emoji.png.webp' }} />
            </View>
          )}
        />
      </View>

      <View className="w-full flex-row justify-evenly items-center">
          <Button onPress={() => swipeRef.current.swipeLeft()} className="w-16 h-16 bg-red-200 items-center justify-center rounded-full">
            <Entypo name="cross" size={24} color="red" />
          </Button>
          <Button onPress={() => swipeRef.current.swipeRight()} className="w-16 h-16 bg-green-200 items-center justify-center rounded-full">
            <AntDesign name="heart" size={24} color="green" />
          </Button>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen;

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