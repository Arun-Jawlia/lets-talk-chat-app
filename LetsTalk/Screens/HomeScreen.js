import {Pressable, StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import UserCard from '../Components/Home/UserCard';
import {userCreateContext} from '../ContextApi/UserContext';
import AxiosInstance from '../Services/ApiServices';
import {GET_ALL_USER_END_POINT} from '../Services/EndPoint';
import {decodeToken} from '../Components/Token/DecodedToken';

const HomeScreen = () => {
  const navigation = useNavigation();
  const {userId, setUserId} = useContext(userCreateContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',

      headerStyle: {
        backgroundColor: '#3b5998',
      },

      headerLeft: () => (
        <View>
          <Text style={{fontSize: 35, fontWeight: 'bold', color: '#fff'}}>
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
              AsyncStorage.clear();
              navigation.replace('Login');
            }}
            name="poweroff"
            size={25}
            color="#fff"
          />
        </View>
      ),
    });
  }, [navigation]);

 
  const getAllUser = async () => {
    const token = await AsyncStorage.getItem('authToken');
    const decodedToken = decodeToken(token)?.payload;
    setUserId(decodedToken?.userId);
    
    try {
      setLoading(true);
      AxiosInstance.get(`${GET_ALL_USER_END_POINT}/${userId}`)
      .then(res => {
        console.log(res?.data?.users);
        setData(res?.data?.users);

      })
      .catch(err => {
        console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
        } catch (error) {}
      };
  useEffect(() => {
   getAllUser()
    }, []);
    
    return (
      <ScrollView
      scrollEnabled
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: '100%',
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
      }}>
      {data?.map((item,index) => (
        <UserCard key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
