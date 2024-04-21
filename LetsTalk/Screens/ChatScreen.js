import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Animated,
} from 'react-native';
import React, {
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';
import {userCreateContext} from '../ContextApi/UserContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import AxiosInstance from '../Services/ApiServices';
import {firebaseApp} from '../Services/Firebase/Firebase';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import ImagePicker, {
  launchCamera,
  launchImageLibrary,
  launchImageLibraryAsync,
} from 'react-native-image-picker';
import {
  DELETE_MESSAGE_BY_IDS_END_POINT,
  GET_MESSAGE_BY_IDS_END_POINT,
  SEND_MESSAGE_END_POINT,
} from '../Services/EndPoint';
// import {EmojiPicker} from 'react-native-emoji-picker'

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const route = useRoute();
  const [showEmoji, setShowEmoji] = useState(false);
  const {userId} = useContext(userCreateContext);
  const {recepientId, recepientUser} = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [messages, setMessages] = useState([]);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [imgPerc, setImgPerc] = useState(0);
  const [fireBaseImages, setFireBaseImages] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({animated: false});
    }
  };

  const SelectImageFromGallery = () => {
    const options = {
      mediaType: 'photo', // Specify the media type (photo or video)
      quality: 0.8, // Specify the image quality (from 0 to 1)
      maxWidth: 800, // Specify the maximum width of the image
      maxHeight: 600, // Specify the maximum height of the image
      allowsEditing: true, // Allow the user to edit the selected image
      aspect: [4, 3], // Specify the aspect ratio for image cropping
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        Alert.alert('Cancel');
      } else {
        if (response) {
          // handleSend('image', response?.assets[0].uri);
          setSelectedImage(response?.assets[0].uri);
        }
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
          handleSend('image', downloadURL);
        });
      },
    );
  };

  useEffect(() => {
    selectedImage && uploadFile(selectedImage);
  }, [selectedImage]);

  const handleSend = async (messageType, imageUrl) => {
    try {
      const payload = {
        senderId: userId,
        recepientId: recepientId,
        imageUrl: messageType === 'image' ? imageUrl : null,
        messageType,
        message,
      };
      const response = await AxiosInstance.post(
        SEND_MESSAGE_END_POINT,
        payload,
        // config,
      );
      // console.log(response.data);
      if (response.data) {
        getAllMessage();
        setMessage('');
        setSelectedImage('');
      }
    } catch (error) {
      console.error('Error in chat', error);
    }
  };

  const getAllMessage = () => {
    AxiosInstance.get(
      `${GET_MESSAGE_BY_IDS_END_POINT}/${userId}/${recepientId}`,
    )
      .then(res => {
        // console.log(res.data);
        setMessages(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllMessage();
  }, []);

  // console.log(selectedMessages)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerLeft: () => (
        <View
          style={{flexDirection: 'row', columnGap: 15, alignItems: 'center'}}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={25}
          />
          <Image
            source={{
              uri: recepientUser?.image,
            }}
            height={30}
            width={30}
            resizeMode="cover"
            borderRadius={15}
          />
          <Text style={{fontWeight: 600, fontSize: 20}}>
            {recepientUser?.name}
          </Text>
        </View>
      ),
      headerRight: () =>
        selectedMessages.length > 0 && (
          <View style={{flexDirection: 'row', gap: 10}}>
            <MaterialIcons
              onPress={() => handleDeleteMessage(selectedMessages)}
              name="delete"
              size={25}
            />

            <AntDesignIcon
              // onPress={() => navigation.goBack()}
              name="staro"
              size={23}
            />
            <MaterialIcons
              onPress={() => setSelectedMessages([])}
              name="clear"
              size={25}
            />
          </View>
        ),
    });
  }, [recepientUser, selectedMessages]);

  const formatTime = time => {
    const options = {hour: 'numeric', minute: 'numeric'};
    return new Date(time).toLocaleString('en-US', options);
  };

  const handleSelectMessage = message => {
    if (message?.messageType === 'text' || message?.messageType === 'image') {
      const isSelectMessage = selectedMessages.includes(message?._id);
      if (isSelectMessage) {
        // If present then remove it from my selectmessage array
        setSelectedMessages(prev => prev.filter(id => id !== message._id));
      } else {
        setSelectedMessages(prev => [...prev, message._id]);
      }
      // const firebaseSelect = fireBaseImages.includes(message?.imageUrl);
      // if (
      //   firebaseSelect &&
      //   message?.messageType === 'image' &&
      //   message?.messageType !== 'text'
      // ) {
      //   setFireBaseImages(prev =>
      //     prev.filter(url => url !== message?.imageUrl),
      //   );
      // } else if (
      //   message?.messageType === 'image' &&
      //   message?.messageType !== 'text'
      // ) {
      //   setFireBaseImages(prev => [...prev, message?.imageUrl]);
      // }
    }
  };

  const handleDeleteMessage = async messageIds => {
    if (selectedMessages.length > 0) {
      // const x = await storage().ref().delete();
      const payload = {
        delMessage: messageIds,
      };

      AxiosInstance.post(DELETE_MESSAGE_BY_IDS_END_POINT, payload)
        .then(res => {
          setSelectedMessages(prevSelectedMessages =>
            prevSelectedMessages.filter(id => !messageIds.includes(id)),
          );
          getAllMessage();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleContneSizeChange = () => {
    scrollToBottom()
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#f0f0f0', marginBottom: 20}}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{flexGrow: 1}}
        onContentSizeChange={handleContneSizeChange}>
        {messages?.map((item, index) => {
          const isSelectMessage = selectedMessages.includes(item._id);
          if (item?.messageType === 'text') {
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#dcf8c6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 6,
                        margin: 10,
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: '#fff',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 6,
                        margin: 10,
                      },
                  isSelectMessage && {
                    width: '100%',
                    backgroundColor: '#f0ffff',
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: isSelectMessage ? 'right' : 'left',
                  }}>
                  {item.message}
                </Text>
                <Text
                  style={{
                    fontSize: 9,
                    textAlign: 'right',
                    color: 'gray',
                    marginTop: 5,
                  }}>
                  {formatTime(item.timeStamp)}
                </Text>
              </Pressable>
            );
          }
          if (item?.messageType === 'image') {
            return (
              <Pressable
                onLongPress={() => handleSelectMessage(item)}
                key={index}
                style={[
                  item?.senderId?._id === userId
                    ? {
                        alignSelf: 'flex-end',
                        backgroundColor: '#dcf8c6',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 6,
                        margin: 10,
                      }
                    : {
                        alignSelf: 'flex-start',
                        backgroundColor: '#fff',
                        padding: 8,
                        maxWidth: '60%',
                        borderRadius: 6,
                        margin: 10,
                      },
                  isSelectMessage && {
                    width: '100%',
                    backgroundColor: '#f0ffff',
                  },
                ]}>
                <View style={{alignSelf: isSelectMessage ? 'flex-end' : ''}}>
                  <Image
                    source={{uri: item.imageUrl}}
                    width={150}
                    height={200}
                    borderRadius={7}
                  />
                  <Text
                    style={{
                      fontSize: 9,
                      textAlign: 'right',
                      color: 'gray',
                      marginTop: 5,
                      position: 'absolute',
                      right: 10,
                      color: 'grey',
                      bottom: 2,
                    }}>
                    {formatTime(item?.timeStamp)}
                  </Text>
                </View>
              </Pressable>
            );
          }
        })}
      </ScrollView>
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          columnGap: 10,
          width: '95%',
          borderRadius: 10,
          alignSelf: 'center',
          paddingVertical: 5,
        }}>
        <EntypoIcon
          onPress={() => setShowEmoji(!showEmoji)}
          name="emoji-happy"
          size={25}
        />

        <TextInput
          placeholder="Enter your message..."
          style={{
            fontSize: 16,
            flex: 1,
          }}
          onChangeText={text => setMessage(text)}
          value={message}
        />
        <Pressable onPress={() => handleSend('text')}>
          <Ionicons name="send" size={25} />
        </Pressable>
        <Pressable onPress={SelectImageFromGallery}>
          <AntDesignIcon name="camerao" size={25} />
        </Pressable>
        <Feather name="mic" size={25} />
      </View>
      {showEmoji && (
        <EmojiSelector
          style={{height: 250}}
          columns={'8'}
          showSearchBar={false}
          onEmojiSelected={emoji => {
            setMessage(prev => prev + emoji);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
