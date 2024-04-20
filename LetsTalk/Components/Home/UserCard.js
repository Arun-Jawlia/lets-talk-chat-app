import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useContext } from 'react';
import { userCreateContext } from '../../ContextApi/UserContext';
import axios from 'axios';
import AxiosInstance from '../../Services/ApiServices';
import { SEND_FRIEND_REQUEST_END_POINT } from '../../Services/EndPoint';

const UserCard = ({item, getAllUser}) => {
  const {userId, setUserId} = useContext(userCreateContext);
  

  const sendFriendRequest= (currentUserId, selectedUserId) =>
  {
    const payload = {
      currentUserId, selectedUserId
    }

    AxiosInstance.post(`${SEND_FRIEND_REQUEST_END_POINT}`, payload)
    .then(res=>
    {
      getAllUser()
    })
    .catch((err)=>
  {
    console.log(err)
  })
  }

  
  return (
    <View
      style={{
        borderColor: '#fff',
        borderWidth: 1,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 2,
        flexDirection: 'column',
        columnGap: 10,
        paddingVertical: 20,
      }}>
      <Image
        style={{
          height: 100,
          width: 100,
          borderRadius: 50,
          flex:1,
          resizeMode: 'cover',
        }}
        source={{
          uri: item?.image,
        }}
      />
      <View style={{alignSelf: 'center'}}>
        <Text style={{fontSize: 24, fontWeight: 500, textAlign: 'center'}}>
          {item.name}
        </Text>
        <Text style={{alignSelf:'center'}} >@{item.email}</Text>
        <View style={{flexDirection: 'row', columnGap: 10, marginTop: 10, alignSelf:'center'}}>
          <TouchableOpacity
          onPress={()=>sendFriendRequest(item._id, userId)}
          disabled={item?.sendFriendRequest?.includes(userId)}
            style={{
              backgroundColor: '#3b5998',
              width: '60%',
              padding: 5,
              borderRadius: 5,
              alignSelf:'center'
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: 'white',
                fontWeight: 500,

              }}>
              Follow

            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
