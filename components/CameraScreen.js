import React, { useState, useEffect, useRef } from "react";
import { Camera, CameraType } from 'expo-camera';
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ImageViewer from '../components/ImageViewer';


export default function CameraScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedImage, setCapturedImage] = useState(null);
    const cameraRef = useRef(null);

    useEffect(() => {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    const toggleCameraType = () => {
      setType(
        type === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back
      );
    };

    const takePicture = async () => {
      if (cameraRef.current) {
        const photo = await cameraRef.current.takePictureAsync();
        console.log(photo.uri); // Chemin de la photo capturée
        setCapturedImage(photo.uri); // Stockez le chemin de la photo capturée
        alert("Capture d'écran enregistrée")
      }
    };

    const cameraHeight = 300;
   
    return (
      <View style={styles.container}>
      <View style={[styles.cameraContainer, { height: cameraHeight }]}>
        {!capturedImage ? ( // Affichez la caméra si capturedImage est null
          <Camera
            style={{ flex: 1 }}
            type={type}
            ref={cameraRef}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={takePicture}>
                <Text style={styles.text}>Take Picture</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : null}
      </View>
      {capturedImage && ( // Affichez l'image capturée si capturedImage n'est pas null
        <ImageViewer placeholderImageSource={{ uri: capturedImage }} style={styles.capturedImage} />
      )}
    </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  cameraContainer: {
    flex: 1,
    height: 300,
    marginTop: 10,
  },
  buttonContainer: {
    flex: 2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  capturedImage: {
    width: '100%', // Pour occuper toute la largeur
    height: 200, // Vous pouvez définir une hauteur spécifique
  },
});
