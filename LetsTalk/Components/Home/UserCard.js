import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

const UserCard = ({item}) => {
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
        flexDirection:'row',
        columnGap:10,
        paddingVertical:20
      }}>
      <Image
        style={{height: 120, width: 100, borderRadius: 10, flex:1, resizeMode:'cover'}}
        source={{
          uri: item?.image,
        }}
      />
     <View style={{alignSelf:'center', flex:1, }}>
     <Text style={{fontSize: 24, fontWeight: 500, textAlign:'left'}}>{(item.name)}</Text>
      <Text >@{item.email}</Text>
      <View style={{flexDirection: 'row', columnGap: 10, marginTop: 10}}>
        <TouchableOpacity
          style={{
            backgroundColor: '#3b5998',
            width: '90%',
            padding: 5,
            borderRadius: 5,
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
