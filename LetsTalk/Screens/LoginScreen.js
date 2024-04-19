<script src="http://192.168.1.24:8097"></script>;
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance, {BASE_API_URL, BASE_URL} from '../Services/ApiServices';
import axios from 'axios';
import {LOGIN_END_POINT} from '../Services/EndPoint';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const authenticationCheck = async () => {
      const isAuth = await AsyncStorage.getItem('authToken');
      if (isAuth) {
        navigation.replace('Home');
      } else {
        // Login Page
      }
    };
    authenticationCheck();
  }, []);

  const handleLogin = async () => {
    if (email && password) {
      setLoading(true);
      const payload = {
        email: email.toLowerCase(),
        password,
      };

      AxiosInstance.post(`${LOGIN_END_POINT}`, payload)
        .then(res => {
          if (res?.data?.token) {
            const token = res?.data?.token;
            AsyncStorage.setItem('authToken', token);
            navigation.replace('Home');
            setEmail('');
            SetPassword('');
          }
        })
        .catch(err => {
          if (err.response.status == '404') {
            Alert.alert('User Not Found');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert('Invalid Credentials', 'Enter valid email and password');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView>
        <View
          style={{
            fontSize: 18,
            color: 'white',
            textAlign: 'center',
            padding: 10,
            paddingHorizontal: 20,
          }}>
          <View style={{marginTop: 100}}>
            <Text
              style={{
                alignSelf: 'center',
                color: '#3b5998',
                fontSize: 30,
                fontWeight: 'bold',
              }}>
              Sign In
            </Text>
            <Text style={{alignSelf: 'center', fontSize: 18}}>
              Login into your account
            </Text>
          </View>
          <View style={{rowGap: 30, marginTop: 30}}>
            <View>
              <Text style={{fontSize: 18}}>Username</Text>
              <TextInput
                placeholder="Enter your username..."
                placeholderTextColor={'black'}
                style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                onChangeText={text => setEmail(text)}
                value={email}
              />
            </View>
            <View>
              <Text>Password</Text>
              <TextInput
                secureTextEntry={true}
                placeholder="Enter your password..."
                placeholderTextColor={'black'}
                style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                passwordRules={true}
                onChangeText={text => SetPassword(text)}
                value={password}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={loading}
            style={{
              width: '60%',
              alignSelf: 'center',
              borderWidth: 1,
              borderRadius: 2,
              padding: 10,
              borderColor: 'black',
              backgroundColor: '#3b5998',
              marginTop: 20,
            }}>
            <Text style={{fontSize: 18, color: 'white', textAlign: 'center'}}>
              {loading ? "Loading..." : "Login"}
            </Text>
          </TouchableOpacity>

          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text style={{fontSize: 17, marginTop: 20, textAlign: 'center'}}>
              New User? Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
