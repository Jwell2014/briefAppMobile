import { StyleSheet, Image, View, Dimensions } from 'react-native';


export default function ImageViewer({ placeholderImageSource }) {
  const screenWidth = Dimensions.get('window').width; // Obtenez la largeur de l'écran

  // Réglez la largeur de l'image en pourcentage de la largeur de l'écran
  const imageWidth = screenWidth * 1; // Vous pouvez ajuster le pourcentage selon vos besoins

  return (
    <View style={styles.imageContainer}>
      <Image source={placeholderImageSource} style={[styles.image, { width: imageWidth }]} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center', // Centrez l'image horizontalement
    marginTop: -100,
  },
  image: {
    height: undefined, // La hauteur est calculée en fonction de la largeur
    aspectRatio: 320 / 250, // Remplacez ces valeurs par les dimensions de votre image d'accueil
    borderRadius: 18,
  },
});
