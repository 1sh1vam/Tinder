import { Image, Text, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Button from '../components/Button';

const MatchedScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View className="bg-red-500 opacity-90 pt-20 h-full">
      <View className="justify-center px-10 pt-20">
        <Image
          className="h-16 w-full"
          source={require('../assets/its-a-match.png')}
        />
      </View>
      <Text className="text-white text-center mt-5">
        You and {userSwiped.displayName} have liked each other.
      </Text>

      <View className="flex-row items-center justify-evenly mt-5">
        <Image
          className="rounded-full w-32 h-32"
          source={{ uri: loggedInProfile.photoUrl }}
        />
        <Image
          className="rounded-full w-32 h-32"
          source={{ uri: userSwiped.photoUrl }}
        />
      </View>

      <Button

        onPress={() => {
          navigation.goBack();
          navigation.navigate('Chat');
        }}
        className="text-center bg-white m-5 px-10 py-6 mt-20 rounded-full"
      >
        <Text className="text-center">Send a Message</Text>
      </Button>
    </View>
  );
}

export default MatchedScreen;