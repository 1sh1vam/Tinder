import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useAuth from './hooks/useAuth';
import './lib/firebase';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Modal from './screens/Modal';

const Stack = createNativeStackNavigator();

export default function Route() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ? (
            <>
            <Stack.Group>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="ChatScreen" component={ChatScreen} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen name="Modal" component={Modal} />
            </Stack.Group>
            </>
          ) : (
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
          )}
        </Stack.Navigator>
    </NavigationContainer>
  );
}
