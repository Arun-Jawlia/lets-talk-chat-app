import {Pressable, StyleSheet, Text, View, Button, TouchableOpacity, Image} from 'react-native';
import React from 'react';


const UserCard = () => {
  return (
    <View
      style={{
        borderColor: 'lightgrey',
        borderWidth: 1,
        alignSelf: 'center',
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
      }}>
      <Image
        style={{height: 100, width: 100, borderRadius: 10}}
        source={{
          uri: 'https://cdn.pixabay.com/photo/2015/06/22/08/38/siblings-817369_1280.jpg',
        }}
      />
      <Text style={{fontSize: 24, fontWeight: 500}}>Arun Jawlia</Text>
      <Text>arunjawlia@1998</Text>
      <View style={{flexDirection:'row', columnGap:10, marginTop:10}}>
        <TouchableOpacity style={{backgroundColor:'#3b5998', width:'50%', padding:5, borderRadius:5}}>
            <Text style={{textAlign:'center', fontSize:18,color:'white', fontWeight:500,}}>
                Follow
            </Text>
        </TouchableOpacity>
        {/* <Pressable style={{backgroundColor:'#3b5998', width:'50%', padding:5, borderRadius:5}}>
            <Text style={{textAlign:'center', color:'white', fontWeight:500,}}>
                Follow
            </Text>
        </Pressable> */}
       
        
      </View>
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({});
