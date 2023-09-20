import React, { useState, useEffect, useRef} from "react";
import { View, StyleSheet, Text, Pressable, TouchableOpacity} from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput"; 
import { ScrollView } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import MapView from 'react-native-maps';
import CameraScreen from "../components/CameraScreen";
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
import DateTimePiker from '@react-native-community/datetimepicker'



export default function Formulaire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [cp, setCp] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [dateHeure, setDateHeure] = useState(new Date());
  const [date, setDate] = useState(""); // Champ pour la date
  const [heure, setHeure] = useState(""); // Champ pour l'heure
  const [showPiker, setShowPiker] = useState(false);

  const [datePiker, setDatePiker] = useState(new Date());

  const [dateOfBirth, setDateOfBirth] = useState("")
  const [timeOfBirth, setTimeOfBirth] = useState("")


  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(new Date());


  const [coordinate, setCoordinate] = useState({ latitude: "", longitude: "" });
  const [convertedAddress, setConvertedAddress] = useState("");


  const PlaceholderImage = require('../assets/images/formulaire.png');

  const alertMessages = {
    Voirie: "Mail envoyer à voirie@simplonville.co",
    Stationnement: "Mail envoyer à Stationnement@simplonville.co",
    Travaux: "Mail envoyer à Travaux@simplonville.co",
    Accident: "Mail envoyer à Accident@simplonville.co",
    Animaux: "Mail envoyer à Animaux@simplonville.co",
  };

  
  const handleValidation = () => {
    const champsObligatoires = {
      nom,
      prenom,
      email,
      adresse,
      cp,
      ville,
      tel,
      message,
      date,
      heure,
      selectedOption,
      convertedAddress,
    };
  
    const champsManquants = [];
  
    for (const champ in champsObligatoires) {
      if (!champsObligatoires[champ] || champsObligatoires[champ] === "") {
        champsManquants.push(champsObligatoires[champ]);
      }
    }
  
    if (isNaN(Number(cp)) || isNaN(Number(tel))) {
      champsManquants.push("Code postal ou Téléphone");
    }
  
    if (champsManquants.length > 0) {
      const champsManquantsMessage = `Veuillez remplir les champs vides`;
      alert(champsManquantsMessage);
      return;
    }
  
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Email:", email);
    console.log("adresse:", adresse);
    console.log("Message:", message);
    console.log("cp:", cp);
    console.log("ville:", ville);
    console.log("tel:", tel);
    console.log("Option sélectionnée:", selectedOption);
    console.log("convertedAddress:", convertedAddress)

    const selectedAlertMessage = alertMessages[selectedOption];
    alert(selectedAlertMessage);
  
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
    setSelectedOption("")
    setConvertedAddress("")
  
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
    const formattedTime = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    setHeure(formattedTime);
  };

  const handleSetCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    setDate(formattedDate);
  };

  const toggledatePiker = () => {
    setShowPiker(!showPiker)
  }

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  const onChange = ({ type, nativeEvent }, selectedDate, ) => {
    if (type === "set") {
      const currentDate = selectedDate || datePiker;
      setDatePiker(currentDate);
  
      // Obtenir le jour, le mois et l'année de la date sélectionnée
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Notez l'ajout de 1 ici pour obtenir le mois correct
      const year = currentDate.getFullYear();
  
      // Formattez la date sélectionnée en JJ/MM/AAAA
      const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      setDate(formattedDate); // Mettez à jour la valeur de date avec la nouvelle date
    } else {
      toggledatePiker();
    }
  };
  
  const onChangeTime = (event, selectedTime) => {
    if (event.type === "set") {
      const currentTime = selectedTime || timePicker;
      setTimePicker(currentTime);
  
      // Formattez l'heure sélectionnée en HH:MM
      const hours = currentTime.getHours().toString().padStart(2, "0");
      const minutes = currentTime.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`;
      
      setHeure(formattedTime); // Mettez à jour la valeur de l'heure avec la nouvelle heure
    }
   
  };
 
  

  const confirmIOSDate = () => {
    console.log("Date sélectionnée :", datePiker);

    setDateOfBirth(datePiker);

    toggledatePiker();
  }

  const confirmIOSTime = () => {
    console.log("heure sélectionnée :", timePicker);

    setTimeOfBirth(timePicker);

    toggleTimePicker();
  }

  // Définissez une référence à la carte
const mapRef = useRef(null);
const convertCoordinatesToAddress = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );

    if (response.data.display_name) {
      const address = response.data.display_name;
      return address;
    } else {
      return 'Adresse introuvable';
    }
  } catch (error) {
    console.error('Erreur lors de la conversion des coordonnées en adresse :', error);
    return 'Erreur de géocodage';
  }
};
  // Fonction pour gérer le clic sur la carte
const handleMapPress = async (event) => {
  const { latitude, longitude } = event.nativeEvent.coordinate;
  setCoordinate({ latitude, longitude });
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

   // Convertir les coordonnées en adresse
   try {
    const address = await convertCoordinatesToAddress(latitude, longitude);
    setConvertedAddress(address);
  } catch (error) {
    console.error('Erreur lors de la conversion des coordonnées en adresse :', error);
    setConvertedAddress('Erreur de géocodage');
  }
};


// Fonction pour obtenir la position actuelle
// const getCurrentLocation = () => {
//   Geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log('Latitude actuelle :', latitude);
//       console.log('Longitude actuelle :', longitude);
      
//       // Utilisez ces coordonnées comme bon vous semble, par exemple, les afficher sur l'écran.
//       // Vous pouvez également mettre à jour l'état pour stocker ces coordonnées si nécessaire.
//       setCoordinate({ latitude, longitude });
//     },
//     (error) => {
//       console.error('Erreur lors de la récupération de la position actuelle :', error);
//     },
//     { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//   );
// };


  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.titre}>FORMULAIRE D'ALERTE</Text>
        <ImageViewer style={styles.imageContainer} placeholderImageSource={PlaceholderImage}/>
      </View>
      <View>
      <FormInput label="Choisissez une alerte :" keyboardType="picker" selectedOption={selectedOption} onOptionChange={handleOptionChange} />
      <View style={styles.mapContainer}>
      <Text>Indiquer un lieu :</Text>  
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
      
      {/* Affichage des coordonnées actuelles */}
      {coordinate.latitude !== "" && coordinate.longitude !== "" && (
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Latitude :</Text>
            <Text style={[styles.dateHeureText, {color: "red"}]}>{coordinate.latitude}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Longitude :</Text>
            <Text style={[styles.dateHeureText, {color: "red"}]}>{coordinate.longitude}</Text>
          </View>


        </View>
      )}

      <Text style={styles.label}>Adresse convertie :</Text>
      <Text style={[styles.dateHeureText, {fontWeight: 'bold'}]}>{convertedAddress}</Text>
  
      <CameraScreen/>

      <FormInput label="Message :" value={message} onChangeText={setMessage} multiline={true} numberOfLines={4} />
      
      {/* Bloc choix de la date */}
      <View style={styles.dateContainer}>
        {!showPiker && (
        <Pressable onPress={toggledatePiker} >
        <FormInput label="Date :" value={date} onChangeText={setDate} inputType="date" toggledatePiker={toggledatePiker}/>
        </Pressable>  
        )}
        
        {showPiker && (
        <DateTimePiker style={styles.datePiker} mode="date" display="spinner" value={datePiker} onChange={onChange}/>
        )}

        {showPiker && Platform.OS === "ios" && (
        <View style= {{flexDirection: "row", justifyContent:"space-around"}}>

          <TouchableOpacity style= {[styles.button, styles.pickerButton, {backgroundColor: "#11182711"}]} onPress={toggledatePiker} >
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {[styles.button, styles.pickerButton]} onPress={confirmIOSDate} >
            <Text style={[styles.buttonText, {color: "#fff"}]}>Enter</Text>
          </TouchableOpacity>
        </View>

        )}
        <Button label="Date actuelle" onPress={handleSetCurrentDate} />
      </View>

      {/* Bloc choix de l'heure */}
      <View style={styles.heureContainer}>
        {!showTimePicker && (
          <Pressable onPress={toggleTimePicker} >
          <FormInput label="Heure :" value={heure} onChangeText={setHeure} inputType="time" toggleTimePiker={toggleTimePicker}/>
          </Pressable>  
        )}

        {showTimePicker && (
        <DateTimePiker style={styles.timePiker} mode="time" display="spinner" value={timePicker} onChange={onChangeTime}/>
        )}

        {showTimePicker && Platform.OS === "ios" && (
        <View style= {{flexDirection: "row", justifyContent:"space-around"}}>

          <TouchableOpacity style= {[styles.button, styles.pickerButton, {backgroundColor: "#11182711"}]} onPress={toggleTimePicker} >
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {[styles.button, styles.pickerButton]} onPress={confirmIOSTime} >
            <Text style={[styles.buttonText, {color: "#fff"}]}>Enter</Text>
          </TouchableOpacity>
        </View>

        )}
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
  button: {
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color:"#075985"
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
  datePiker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20
  }
});
