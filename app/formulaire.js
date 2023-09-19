import React, { useState, useEffect, useRef} from "react";
import { View, StyleSheet, Text} from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput"; 
import { ScrollView } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import MapView from 'react-native-maps';
import CameraScreen from "../components/CameraScreen";


export default function Formulaire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("option1");
  const [dateHeure, setDateHeure] = useState(new Date());
  const [date, setDate] = useState(""); // Champ pour la date
  const [heure, setHeure] = useState(""); // Champ pour l'heure
  const [coordinate, setCoordinate] = useState({ latitude: "", longitude: "" });


  const PlaceholderImage = require('../assets/images/formulaire.png');

  const alertMessages = {
    Voirie: "Mail envoyer à voirie@simplonville.co",
    Stationnement: "Mail envoyer à Stationnement@simplonville.co",
    Travaux: "Mail envoyer à Travaux@simplonville.co",
    Accident: "Mail envoyer à Accident@simplonville.co",
    Animaux: "Mail envoyer à Animaux@simplonville.co",
  };

  
  const handleValidation = () => {
    // Traitez les données du formulaire ici.
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Email:", email);
    console.log("adresse:", adresse);
    console.log("Message:", message);
    console.log("cp:", cp);
    console.log("ville:", ville);
    console.log("tel:", tel);

    console.log("Option sélectionnée:", selectedOption);
    // Obtenez le message d'alerte correspondant à l'option sélectionnée
    const selectedAlertMessage = alertMessages[selectedOption];
    // Affichez l'alerte avec le message correspondant
    alert(selectedAlertMessage);

     // Obtenez la date et l'heure actuelles
     const currentDate = new Date();

     // Utilisez les valeurs des champs date et heure s'ils sont définis, sinon conservez la date actuelle
  const dateModifiee = date ? new Date(date) : currentDate;
  const heureModifiee = heure ? new Date(heure) : currentDate;

    // Créez une nouvelle date avec les valeurs modifiées
  const dateEtHeureModifiees = new Date(
    dateModifiee.getFullYear(),
    dateModifiee.getMonth(),
    dateModifiee.getDate(),
    heureModifiee.getHours(),
    heureModifiee.getMinutes(),
    currentDate.getSeconds()
  );

  console.log("Date modifiée:", dateModifiee.toLocaleDateString());
  console.log("Heure modifiée:", heureModifiee.toLocaleTimeString());
    // Réinitialisez les champs après la soumission du formulaire
    setNom("");
    setPrenom("");
    setEmail("");
    setAdresse("");
    setCp("");
    setVille("");
    setTel("");

    setMessage("");
    setSelectedOption("option1");
    setDate("");
    setHeure("");

  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Mettez à jour la date et l'heure chaque seconde
      setDateHeure(new Date());
    }, 1000); // Mettez à jour toutes les 1000 millisecondes (1 seconde)

    // Nettoyez l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, []);

  const handleOptionChange = (itemValue) => {
    setSelectedOption(itemValue);
  };

  const handleSetCurrentTime = () => {
    const currentTime = new Date();
  const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
  setHeure(formattedTime);
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setDate(formattedDate);
  };

  // Définissez une référence à la carte
const mapRef = useRef(null);

  // Fonction pour gérer le clic sur la carte
const handleMapPress = (event) => {
  const { latitude, longitude } = event.nativeEvent.coordinate;
  setCoordinate({ latitude, longitude });
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
};

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titre}>FORMULAIRE D'ALERTE</Text>
        <ImageViewer style={styles.imageContainer} placeholderImageSource={PlaceholderImage}/>
      </View>
      <View>
      <Text style={styles.label}>Date et heure actuelles :</Text>
      <Text style={styles.dateHeureText}>{dateHeure.toLocaleString()}</Text>

      <FormInput label="Choisissez une alerte :" keyboardType="picker" selectedOption={selectedOption} onOptionChange={handleOptionChange} />
      <View style={styles.mapContainer}>
      <MapView
    ref={mapRef}
    style={styles.map}
    initialRegion={{
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    onPress={handleMapPress} // Ajoutez cet événement
  />
      </View>
      
      <Text style={styles.label}>Latitude :</Text>
      <Text style={styles.dateHeureText}>{coordinate.latitude}</Text>
      <Text style={styles.label}>Longitude :</Text>
      <Text style={styles.dateHeureText}>{coordinate.longitude}</Text>
      
      <CameraScreen/>

      <FormInput label="Message :" value={message} onChangeText={setMessage} multiline={true} numberOfLines={4} />
      
      <View style={styles.dateContainer}>
        <FormInput label="Date :" value={date} onChangeText={setDate} inputType="date" />
        <Button label="Date actuelle" onPress={handleSetCurrentDate} />
      </View>
      <View style={styles.heureContainer}>
          <FormInput label="Heure :" value={heure} onChangeText={setHeure} inputType="time" />
          <Button label="Heure actuelle" onPress={handleSetCurrentTime} />
        </View>

      <FormInput label="Nom :" value={nom} onChangeText={setNom} inputType="text"/>
      <FormInput label="Prénom :" value={prenom} onChangeText={setPrenom} inputType="text"/>
      <FormInput label="Adresse :" value={adresse} onChangeText={setAdresse} inputType="text"/>
      <FormInput label="Code postale :" value={cp} onChangeText={setCp} inputType="number"/>
      <FormInput label="Ville :" value={ville} onChangeText={setVille} inputType="text"/>
      <FormInput label="Telephone :" value={tel} onChangeText={setTel} inputType="number"/>
      <FormInput label="Email :" value={email} onChangeText={setEmail} keyboardType="email-address" />
      </View> 
      <Button label="Valider" onPress={handleValidation} />
      <Button label="Retour à l'accueil" theme="backToHome" />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  datePicker: {
    width: 200,
    marginBottom: 10,
  },
  titre:{
    fontSize: 25,
    textAlign: "center",
    marginBottom: 50
  },
  dateHeureText: {
    fontSize: 16,
    padding: 10,
  },
  imageContainer: {
    height: 10,
    width: 50
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  map: {
    width: "80%",
    height: 300,
  },
  coordinatesText: {
    fontSize: 16,
    marginTop: 10,
  },
});
