import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ImageViewer from './components/ImageViewer';
import Button from './components/Button';

export default function App() {

  const PlaceholderImage = require('./assets/images/accueil.jpeg');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Maire de Simplonville</Text>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage}/>
      </View>      
      <View style={styles.footerContainer}>
        <Button label="Formulaire d'alerte" />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text:{
    color:'white',
    paddingTop: 120,
    fontSize: 20
  },
  imageContainer: {
    flex: 1,
    paddingTop: 50,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
