import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import { GET_MESSAGE_BY_IDS_END_POINT } from '../../Services/EndPoint';
import { userCreateContext } from '../../ContextApi/UserContext';
import AxiosInstance from '../../Services/ApiServices';

const ChatsCard = ({item}) => {
  const navigation = useNavigation();
  const {userId} = useContext(userCreateContext);
  const [lastMessage, setLastMessage] = useState({})
  // const [lastImage, setLastImage] = useState({})


  const getAllMessage = () => {
    AxiosInstance.get(
      `${GET_MESSAGE_BY_IDS_END_POINT}/${userId}/${item?._id}`,
    )
      .then(res => {
      
        const messages = res?.data
        const lastMessage = messages.filter((message)=>message.messageType==='text')
        {
          setLastMessage(messages[messages.length-1]);

        }
        // messages.filter((message)=>message.messageType==='image')
        // {
        //   setLastImage(messages[messages.length-1]);
        // }
        
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllMessage();
  }, []);
  // console.log(lastMessage)

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {
          recepientId: item._id, recepientUser:item
        })
      }
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        borderWidth: 0.7,
        borderColor: '#D0D0D0',
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
      }}>
      <Image
        style={{width: 50, height: 50, borderRadius: 25, resizeMode: 'cover'}}
        source={{uri: item?.image}}
      />

      <View style={{flex: 1}}>
        <Text style={{fontSize: 18, fontWeight: 600}}>{item?.name}</Text>
        {
          (lastMessage &&  (
            <Text
              style={{
                marginTop: 3,
                color: 'gray',
                fontSize: 12,
                fontWeight: '500',
              }}>
              {lastMessage?.message}
            </Text>
          ))
          // (lastImage &&  (
          //   <Text
          //     style={{
          //       marginTop: 3,
          //       color: 'gray',
          //       fontSize: 12,
          //       fontWeight: '500',
          //     }}>
          //     Image
          //   </Text>
          // ))
        }
      </View>

      <View>
        <Text style={{fontSize: 12, fontWeight: '400', color: '#585858'}}>
          {lastMessage && formatTime(lastMessage?.timeStamp)}
          
        </Text>
      </View>
    </Pressable>
  );
};

export default ChatsCard;

const styles = StyleSheet.create({});
