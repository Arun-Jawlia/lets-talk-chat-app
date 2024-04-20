import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useContext} from 'react';
import {userCreateContext} from '../../ContextApi/UserContext';
import AxiosInstance from '../../Services/ApiServices';
import {
  ACCEPT_FRIEND_REQUEST_END_POINT,
  SEND_FRIEND_REQUEST_END_POINT,
} from '../../Services/EndPoint';
import {useNavigation} from '@react-navigation/native';

const FriendRequestCard = ({item, handlleGetFriendRequest}) => {
  const {userId} = useContext(userCreateContext);
  const navigation = useNavigation();

  const acceptFriendRequest = senderId => {
    const payload = {
      senderId,
      recepientId: userId,
    };

    AxiosInstance.post(`${ACCEPT_FRIEND_REQUEST_END_POINT}`, payload)
      .then(res => {
        handlleGetFriendRequest();

        navigation.navigate('Chats');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View
      style={{
        borderColor: '#fff',
        borderWidth: 1,

        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 5,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        elevation: 1,
        flexDirection: 'row',
        columnGap: 10,
        paddingVertical: 20,
        justifyContent: 'space-between',
      }}>
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 50,

          resizeMode: 'cover',
        }}
        source={{
          uri: item?.image,
        }}
      />

      <Text
        style={{fontSize: 20, fontWeight: 600, flex: 1, textAlign: 'justify'}}>
        {item.name} sent you a friend request.
      </Text>

      <TouchableOpacity
        onPress={() => acceptFriendRequest(item._id)}
        style={{
          backgroundColor: '#3b5998',
          // width: '60%',
          padding: 5,
          borderRadius: 5,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            color: 'white',
            fontWeight: 500,
          }}>
          Accept
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FriendRequestCard;

const styles = StyleSheet.create({});
