import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  Alert,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import firebaseConfig from '../../config';
import firebase from 'firebase';
// import ImagePicker from 'react-native-image-crop-picker';
import * as Picker from 'react-native-image-picker';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  console.log('connect');
}

const {width, height} = Dimensions.get('window');

// const database = firebase.database()

const Home = () => {
  const [imageAvatar, setImageAvatar] = useState(null);
  const [imgName, setImgName] = useState(null);
  const [imgType, setImgType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
  firebase.storage().ref('images/14927.984508832726/4C788287-D304-4DF7-A3FD-ED1623BE8DB0.jpg').getDownloadURL().then((downloadURL) =>{
    console.log('downloadURL',downloadURL);
    setImageAvatar(downloadURL)
  })
},[])

  const takePhotoCamera = async () => {
    // await Picker.launchCamera(
    //   {
    //     maxWidth: 300,
    //     maxHeight: 400,
    //   },
    //   res => {
    //     console.log('res', res);
    //     // uploadImage(res.uri, res.fileName,res.type);
    //     setImageAvatar(res.uri);
    //     setModalVisible(!modalVisible);
    //   },
    // );
  };

  const takePhotoLibrary = async () => {
    await Picker.launchImageLibrary(
      {
        maxWidth: 300,
        maxHeight: 400,
        mediaType: 'photo',
        quality: 1,
      },
      res => {
        console.log('res', res);
        // uploadImage(res.uri,res.fileName,res.type);
        setImageAvatar(res.uri);
        setImgName('day la cay bong');
        setImgType(res.type);
        setModalVisible(!modalVisible);
      },
    );
  };

  const uploadImage = async (uri, imageName, type) => {
    const responsive = await fetch(uri);
    // console.log('responsive', responsive);

    const blob = await responsive.blob();
    // console.log('blob', blob);

    // let randomMath = Math.random() * 100000;
    // let ref = firebase.storage().ref(`images/${randomMath}/` + imageName);

    let ref = firebase.storage().ref(`images/14927.984508832726/` + imageName);
    if (ref !== '') {
      ref.put(blob, type).then( snapshot => {
      console.log('snapshot', snapshot);
      Alert.alert('Success!')
    })
    }

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.imageViewAva}
        onPress={() => setModalVisible(!modalVisible)}>
        <Image
          style={styles.imageAva}
          resizeMode="stretch"
          source={{
            uri: imageAvatar,
          }}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageViewBtn}
        onPress={() => uploadImage(imageAvatar, imgName, imgType)}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Upload Image to Firebase
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible) }>
        <View style={styles.viewModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.btnModal} onPress={takePhotoCamera}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 18,
                }}>
                Take a photo to camera
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnModal}
              onPress={takePhotoLibrary}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 18,
                }}>
                Take a photo to library
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnModalCancel}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text
                style={{
                  color: 'red',
                  fontSize: 18,
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageViewAva: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.03,
    borderWidth: 1,
  },
  imageAva: {
    width: '100%',
    height: '100%',
    borderRadius: width * 0.03,
  },
  imageViewBtn: {
    // borderWidth: 1,
    marginTop: width * 0.05,
    backgroundColor: '#99CCFF',
    height: width * 0.1,
    width: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.02,
  },
  viewModal: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(181,181,181,0.1)',
    // opacity: 0.5
  },
  modalContent: {
    width: width * 1,
    height: height * 0.25,
    alignItems: 'center',
    // backgroundColor:'white',
    // borderWidth: 1,
  },
  btnModal: {
    marginTop: width * 0.02,
    // borderWidth: 1,
    width: width * 0.9,
    height: Platform.OS === 'ios' ? width * 0.15  : width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    backgroundColor: 'white',
  },
  btnModalCancel: {
    marginTop: width * 0.05,
    // borderWidth: 1,
    width: width * 0.9,
    height: width * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width * 0.03,
    backgroundColor: 'white',
  },
});
