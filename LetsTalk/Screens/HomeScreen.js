import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import UserCard from '../Components/Home/UserCard';

const HomeScreen = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',

      headerStyle:{
        backgroundColor:'#3b5998'
      },

      headerLeft: () => (
        <View>
          <Text  style={{fontSize: 35, fontWeight: 'bold', color: '#fff'}}>
            Let's Connect
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{flexDirection: 'row', alignItems: 'center', columnGap: 10}}>
          <Ionicon
            onPress={() => {
              navigation.navigate('Chats');
            }}
            name="chatbox-ellipses-outline"
            size={30}
            color="#fff"
          />
          <Ionicon
            onPress={() => {
              navigation.navigate('Notification');
            }}
            name="notifications-outline"
            size={30}
            color="#fff"
          />

          <AntDesignIcon
            onPress={() => {
              AsyncStorage.removeItem('authToken');
              navigation.navigate('Login');
            }}
            name="poweroff"
            size={25}
            color="#fff"
          />
        </View>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView scrollEnabled style={{paddingVertical: 10,paddingHorizontal:20, height: '100%', marginBottom:20, backgroundColor:'#f2f2f2'}}>
      {[...Array(10).keys()].map(index => (
        <UserCard key={index} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
