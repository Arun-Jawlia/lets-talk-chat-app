import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { userCreateContext } from '../../ContextApi/UserContext';
import axios from 'axios';
import AxiosInstance from '../../Services/ApiServices';
import { SEND_FRIEND_REQUEST_END_POINT } from '../../Services/EndPoint';

const UserCard = ({item, getAllUser}) => {
  const {userId} = useContext(userCreateContext);
  const [requestSent, setRequestSent] = useState(false)
  const [friendRequestSent, setFriendRequestSent] = useState([])
  const [userFriends, setUserFriends] = useState([])


  useEffect(()=>
{
  const fetchFriendRequest = async () =>{
   AxiosInstance.get(`/api/friend-request/sent/${userId}`)
   .then(res=>{
    // console.log(res.data)
    setFriendRequestSent(res?.data)
   })
   .catch(err=>
  {
    console.log(err)
  })
  }
  fetchFriendRequest()
},[])


  useEffect(()=>
{
  const fetchUserFriend = async () =>{
   AxiosInstance.get(`/api/friends/${userId}`)
   .then(res=>{
    // console.log(res.data)
    setUserFriends(res?.data)
   })
   .catch(err=>
  {
    console.log(err)
  })
  }
  fetchUserFriend()
},[])




  

  const sendFriendRequest= (currentUserId, selectedUserId) =>
  {
    const payload = {
      currentUserId, selectedUserId
    }

    AxiosInstance.post(SEND_FRIEND_REQUEST_END_POINT, payload)
    .then(res=>
    {
      setRequestSent(true)
      getAllUser()
    })
    .catch((err)=>
  {
    console.log(err)
  })
  }


  
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
          source={{ uri: item.image }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "bold" }}>{item?.name}</Text>
        <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
      </View>     
      {userFriends.includes(item._id) ? (
        <Pressable
          style={{
            backgroundColor: "#82CD47",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white" }}>Friends</Text>
        </Pressable>
      ) : requestSent || friendRequestSent.some((friend) => friend._id === item._id) ? (
        <Pressable
          style={{
            backgroundColor: "gray",
            padding: 10,
            width: 105,
            borderRadius: 6,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Request Sent
          </Text>
        </Pressable>
      ) : (
        <Pressable
          onPress={() => sendFriendRequest(userId, item?._id)}
          style={{
            backgroundColor: "#567189",
            padding: 10,
            borderRadius: 6,
            width: 105,
          }}
        >
          <Text style={{ textAlign: "center", color: "white", fontSize: 13 }}>
            Add Friend
          </Text>
        </Pressable>
      )}
    </Pressable>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
