import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import Button from '../components/Button';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-deck-swiper';

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
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5">
        <Button onPress={logout}>
          <Image className="w-10 h-10 rounded-full" source={{ uri: user.photoURL }} />
        </Button>
        <Button>
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
          cards={DUMMY_DATA}
          cardVerticalMargin={0}
          stackSize={5}
          cardIndex={0}
          verticalSwipe={false}
          animateCardOpacity
          renderCard={(card) => (
            <View key={card.id} className="bg-white h-[60%] rounded-xl">
              <Image className="w-full h-full rounded-t-xl" source={{ uri: card.photoUrl }} />
              <View style={styles.cardShadow} className="flex-row justify-between px-6 py-2 bg-white rounded-b-xl h-20">
                <View>
                  <Text className="text-xl font-bold">{card.firstName} {card.lastName}</Text>
                  <Text>{card.occupation}</Text>
                </View>
                <Text className="text-2xl font-bold">{card.age}</Text>
              </View>
            </View>
          )}
        />
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