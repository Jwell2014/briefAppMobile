import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons'; 
import { Link } from 'expo-router';


export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainerRouter, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Link href="/formulaire" asChild>
          <Pressable style={styles.buttonContent}>
            <AntDesign name="filetext1" size={24} color="white" />
            <Text style={[styles.text]}>{label}</Text>
          </Pressable>
        </Link>
      </View>
    );

  } else if (theme === "backToHome") { // Ajoutez une condition pour le bouton "Retour à l'accueil"
    return (
      <View style={[styles.buttonContainerBackToHome, {backgroundColor: "#11182711" }]}>
        <Link href="/" asChild>
          <Pressable>
            <Text style={[{fontSize: 25}]}>{label}</Text>
          </Pressable>
        </Link>
      </View>
    );
  }else if (theme === "currentDate") { // Ajoutez un thème pour le bouton "Date actuelle"
    return (
      <View style={[styles.buttonContainerDate]}>
        <Pressable onPress={onPress}>
          <Text style={[styles.text2, {color: "#fff"}]}>{label}</Text>
        </Pressable>
      </View>
    );
  }else {
    return (
      <View style={[styles.buttonContainer]}>
        <Pressable onPress={onPress}>
          <Text style={[{fontSize: 25,color: "#fff"}]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 100,
    backgroundColor: "#075985",
    width: 150,
  },
  buttonContainerBackToHome: {
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 100,
    backgroundColor: "#075985",
    width: 150,
    marginHorizontal: 20
  },
  buttonContainerRouter: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom: 20
  },
  buttonContainerDate: {
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#075985",
    width: 150,
  },
  text:{
    color:'white',
    fontSize: 20,
    marginLeft: 10
  },
  text2:{
    color:'black',
    fontSize: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center', // Pour aligner les éléments verticalement au centre
    justifyContent: 'center', // Pour centrer les éléments horizontalement
  },
});
