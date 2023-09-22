import { StyleSheet, Text, View, Pressable } from "react-native";
import ImageViewer from '../components/ImageViewer';
import Button from '../components/Button';
import { StatusBar } from 'expo-status-bar';
import { ImageProvider } from '../contexte/ImageContext';



export default function Page() {
  const PlaceholderImage = require('../assets/images/accueil.jpeg');

  return (
    <ImageProvider>
    <View style={styles.container}>
      <View>
         <Text style={styles.titre}>Maire de Simplonville</Text>
         <Text style={styles.sousTitre}>FORMULAIRE D'ALERTE</Text>

      </View>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage}/>
      </View>   
      <Text style={styles.text}>Ceci est un formulaire de signalement vous permettant d’alerter directement 
        les services municipaux lorsque vous rencontrez un dysfonctionnement dans votre ville.
      </Text>   
      <Text style={styles.text}>(Ex. : propreté, voirie, éclairage public…)</Text>
      <View style={styles.footerContainer}>
      <Button theme="primary"  label="Remplir formulaire" />
      </View>
      <StatusBar style="auto" />
    </View>
    </ImageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titre:{
    color:'white',
    marginTop: 50,
    fontSize: 30
  },
  sousTitre: {
    color:'white',
    fontSize: 15,
    textAlign: "center"
  },
  text:{
    color:'white',
    fontSize: 20,
    paddingBottom: 50
  },
  text2:{
    color:'white',
    fontSize: 20,
  
  },
  imageContainer: {
    flex: 1,
    marginTop: 120
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
    marginBottom: 50
  },
});
