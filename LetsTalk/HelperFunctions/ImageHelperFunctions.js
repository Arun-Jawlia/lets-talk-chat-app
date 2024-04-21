import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const ClickPhotoByCamera = (setSelectedImage) => {
    launchCamera({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        
        setSelectedImage(response?.assets[0].uri);
       
      }
    });
  };
  export const SelectImageFromGallery = (setSelectedImage) => {
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