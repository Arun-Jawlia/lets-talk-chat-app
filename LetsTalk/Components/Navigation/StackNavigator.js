import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../../Screens/LoginScreen';
import RegisterScreen from '../../Screens/RegisterScreen';
import HomeScreen from '../../Screens/HomeScreen';
import NotificationScreen from '../../Screens/NotificationScreen';
import ChatsScreen from '../../Screens/ChatsScreen';
import {NavigationContainer} from '@react-navigation/native';
import ChatScreen from '../../Screens/ChatScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={true} />
        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{title:'Friend requests'}}
        />
        <Stack.Screen name="Chats" component={ChatsScreen} options={true} />
        <Stack.Screen name="Chat" component={ChatScreen} options={true} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
