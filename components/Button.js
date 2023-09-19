import { StyleSheet, View, Pressable, Text } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from '@expo/vector-icons'; 
import { Link } from 'expo-router';


export default function Button({ label, theme, onPress }) {
  if (theme === "primary") {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Link href="/formulaire" asChild>
          <Pressable>
            <Text style={[styles.text]}>{label}</Text>
            <AntDesign name="filetext1" size={24} color="white"/>
          </Pressable>
        </Link>
      </View>
    );
  } else if (theme === "backToHome") { // Ajoutez une condition pour le bouton "Retour à l'accueil"
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "black", borderRadius: 18 }]}>
        <Link href="/" asChild>
          <Pressable>
            <Text style={[styles.text2]}>{label}</Text>
          </Pressable>
        </Link>
      </View>
    );
  }else if (theme === "currentDate") { // Ajoutez un thème pour le bouton "Date actuelle"
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
        <Pressable onPress={onPress}>
          <Text style={[styles.text]}>{label}</Text>
        </Pressable>
      </View>
    );
  }else {
    return (
      <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "black", borderRadius: 18 }]}>
        <Pressable onPress={onPress}>
          <Text style={[styles.text2]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    marginBottom: 20
  },
  text:{
    color:'white',
    fontSize: 20
  },
  text2:{
    color:'black',
    fontSize: 20,
  },
});
