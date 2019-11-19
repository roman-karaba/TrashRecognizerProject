import React from 'react';
import { Text, View, TouchableOpacity, Button, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { styles } from '../Styles.js';

export default class TrashCamera extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async sendPicture (image) {
    const url = 'http://192.168.43.94:3000/pic';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'equipment_image': {
          'image_encoded': 'data:image/jpeg;base64',
          'imagebase64' : image.base64
        }
      })
    });

    return response.json();
  }

  async takePicture() {
    if (this.camera != undefined) {
      const cameraOptions = {
        base64: true
      };

      console.log('Capturing Photo');
      let photo = await this.camera.takePictureAsync(cameraOptions);

      console.log('Sending photo for evaluation');
      const response = await this.sendPicture(photo);
      console.log(response);
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;

    } else {
      return (
        <View style={styles.flexcontainer}>
          <Camera 
            type={this.state.type}
            ref={ref => {
              this.camera = ref; 
            }}
          >
            <View
              style={styles.cameraview}>
              <TouchableOpacity
                style={{
                  display: "flex",
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type:
                      this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                  });
                }}>
                <Button title="Flip" style={styles.flipbtn}/> 
              </TouchableOpacity>
            </View>
          </Camera>
          <Button 
            title="Take Photo"
            style={styles.photobtn}
            onPress={this.takePicture.bind(this)}/>     
        </View>
      );
    }
  }
}