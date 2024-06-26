import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Button,
  Image,
  ScrollView,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectImageModal from '../Components/Modal/SelectImageModal';
import {
  firebaseAuth,
  firebaseApp,
  provider,
} from '../Services/Firebase/Firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import AxiosInstance from '../Services/ApiServices';
import {REGISTER_END_POINT} from '../Services/EndPoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [imgPerc, setImgPerc] = useState(0);
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

  const ClickPhotoByCamera = () => {
    launchCamera({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set selected image URI
        setSelectedImage(response?.assets[0].uri);
        // console.log(response?.assets[0].uri)
      }
    });
  };
  const SelectImageFromGallery = () => {
    launchImageLibrary({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Cancel');
      } else {
        setSelectedImage(response?.assets[0].uri);
      }
    });
  };

  const uploadFile = async file => {
    const response = await fetch(file);
    const blob = await response.blob();
    const storage = getStorage(firebaseApp);
    const fileName =
      new Date().getTime() +
      '-' +
      Math.random().toString(36).substring(7) +
      '.jpg';
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            break;
          case 'running':
            break;
          default:
            break;
        }
      },
      error => {},

      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImageUrl(downloadURL);
        });
      },
    );
  };

  useEffect(() => {
    selectedImage && uploadFile(selectedImage);
  }, [selectedImage]);

  const handleRegister = () => {
    if (email && name && password && imageUrl) {
      setLoading(true);
      const payload = {
        email:email.toLowerCase(),
        name,
        password,
        image: imageUrl,
      };
      AxiosInstance.post(`${REGISTER_END_POINT}`, payload)
        .then(res => {
          if (res?.data) {
            const token = res?.data?.token;
            AsyncStorage.setItem('authToken', token);
            Alert.alert('Registered Successfully');
            navigation.replace('Home');
            setEmail('');
            SetPassword('');
            setName('');
            setSelectedImage(null);
          }
        })
        .catch(err => {
          Alert.alert(err?.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      Alert.alert('Fill all required fields');
    }
  };

  return (
    <>
      <KeyboardAvoidingView>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView
            style={{
              fontSize: 18,
              color: 'white',
              textAlign: 'center',
              padding: 10,
              paddingHorizontal: 20,
              position: 'relative',
              width: '100%',
              marginBottom: 20,
            }}>
            <View style={{marginTop: 100}}>
              <Text
                style={{
                  alignSelf: 'center',
                  color: '#3b5998',
                  fontSize: 30,
                  fontWeight: 'bold',
                }}>
                Sign Up
              </Text>
              <Text style={{alignSelf: 'center', fontSize: 18}}>
                Create your account
              </Text>
            </View>

            <View style={{rowGap: 10, marginTop: 30}}>
              <View>
                <Pressable onPress={() => setModalVisible(true)}>
                  {selectedImage ? (
                    <Image source={{uri: selectedImage}} style={styles.image} />
                  ) : (
                    <Image
                      source={{
                        uri: 'https://img.freepik.com/premium-vector/camera-logo-vector_535345-914.jpg?w=740',
                      }}
                      style={styles.image}
                    />
                  )}
                </Pressable>
                {selectedImage && (
                  <Text style={{textAlign: 'center'}}>
                    {imgPerc > 0 && imgPerc} %
                  </Text>
                )}
              </View>

              <View>
                <Text style={{fontSize: 18}}>Name</Text>
                <TextInput
                  placeholder="Enter your name..."
                  placeholderTextColor={'black'}
                  style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                  onChangeText={text => setName(text)}
                />
              </View>
              <View>
                <Text style={{fontSize: 18}}>Username</Text>
                <TextInput
                  placeholder="Choose unique username..."
                  placeholderTextColor={'black'}
                  style={{borderBottomColor: 'black', borderBottomWidth: 1}}
                  onChangeText={text => setEmail(text)}
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
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={handleRegister}
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
                {loading ? 'Loading...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            <Pressable onPress={() => navigation.goBack()}>
              <Text style={{fontSize: 17, marginTop: 20, textAlign: 'center'}}>
                Already User? Sign In
              </Text>
            </Pressable>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <SelectImageModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        SelectImageFromGallery={SelectImageFromGallery}
        ClickPhotoByCamera={ClickPhotoByCamera}
      />
    </>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
});
