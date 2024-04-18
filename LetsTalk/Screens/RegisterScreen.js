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
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SelectImageModal from '../Components/Modal/SelectImageModal';


const RegisterScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set selected image URI
        setSelectedImage(response?.assets[0].uri);
        // console.log(response?.assets[0].uri)
      }
    });
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
            <View style={{rowGap: 20, marginTop: 30}}>
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
                <Text style={{fontSize: 18}}>Email</Text>
                <TextInput
                  placeholder="Enter your email..."
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
            <Pressable
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
                Register
              </Text>
            </Pressable>

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
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: 'lightgrey',
    borderWidth: 1,
  },
});
