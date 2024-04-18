import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

const SelectImageModal = ({
  modalVisible,
  setModalVisible,
  SelectImageFromGallery,
  ClickPhotoByCamera,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Choose the Image location </Text>
              <View>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => {
                      ClickPhotoByCamera();
                      setModalVisible(false);
                    }}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      From Camera
                    </Text>
                  </Pressable>
                </View>
                <View>
                  <Pressable
                    style={[styles.button, styles.buttonOpen, {marginTop: 5}]}
                    onPress={() => {
                      SelectImageFromGallery();
                      setModalVisible(false);
                    }}>
                    <Text style={{color: 'white', fontWeight: '500'}}>
                      From Gallery
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default SelectImageModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
