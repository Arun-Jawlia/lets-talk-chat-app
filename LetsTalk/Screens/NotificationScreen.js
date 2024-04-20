import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {userCreateContext} from '../ContextApi/UserContext';
import axios from 'axios';
import AxiosInstance from '../Services/ApiServices';
import {GET_FRIEND_REQUEST_END_POINT} from '../Services/EndPoint';
import FriendRequestCard from '../Components/Notification/FriendRequestCard';

const NotificationScreen = () => {
  const [friendRequest, setFriendRequest] = useState([]);
  const {userId, setUserId} = useContext(userCreateContext);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) {
      handlleGetFriendRequest();
    }
  }, [userId]);

  const handlleGetFriendRequest = () => {
    setRefreshing(true);
    AxiosInstance.get(`${GET_FRIEND_REQUEST_END_POINT}/${userId}`)
      .then(res => {
        console.log(res.data);
        const friendRequests = res?.data?.friendRequests?.map(item => ({
          _id: item._id,
          name: item.name,
          email: item.email,
          image: item.image,
        }));
        setFriendRequest(friendRequests);
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
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handlleGetFriendRequest}
        />
      }
      style={{
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: '100%',
        marginBottom: 20,
        backgroundColor: '#f2f2f2',
      }}>
      <Text style={{textAlign:'center', fontSize:18}}>
      {friendRequest?.length > 0 ? 'Your Friend Requests' :'Not Found'}
      </Text>
      {friendRequest?.map((item, index) => (
        <FriendRequestCard
          key={index}
          item={item}
          handlleGetFriendRequest={handlleGetFriendRequest}
        />
      ))}
    </ScrollView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
