import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {userCreateContext} from '../ContextApi/UserContext';
import AxiosInstance from '../Services/ApiServices';
import {MY_FRIENDS_END_POINT} from '../Services/EndPoint';
import ChatsCard from '../Components/Chats/ChatsCard';

const ChatsScreen = () => {
  const [friends, setFriends] = useState([]);
  const {userId, setUserId} = useContext(userCreateContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) {
      getMyFriends();
    }
  }, [userId]);

  const getMyFriends = () => {
    setRefreshing(true);
    AxiosInstance.get(`${MY_FRIENDS_END_POINT}/${userId}`)
      .then(res => {
        // console.log(res.data);
        setFriends(res.data.friends);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  


  return (
    <ScrollView
      scrollEnabled
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={getMyFriends} />
      }
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: '100%',
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
      }}>
      {friends?.map((item, index) => (
        <ChatsCard key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
