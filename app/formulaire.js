import React, { useState, useEffect, useRef} from "react";
import { View, StyleSheet, Text, Pressable, TouchableOpacity} from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput"; 
import { ScrollView } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import MapView, {Marker} from 'react-native-maps';
import CameraScreen from "../components/CameraScreen";
import axios from 'axios';
import { PermissionsAndroid, Platform } from 'react-native';
import DateTimePiker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native';
import { ImageProvider } from '../contexte/ImageContext';
import * as MailComposer from 'expo-mail-composer';
import * as Location from 'expo-location';





export default function Formulaire() {
  const [dateHeure, setDateHeure] = useState(new Date());
  const [showPiker, setShowPiker] = useState(false);

  const [datePiker, setDatePiker] = useState(new Date());

  const [dateOfBirth, setDateOfBirth] = useState("")
  const [timeOfBirth, setTimeOfBirth] = useState("")

  const [locationPiker, setLocationPiker] = useState(false)

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePicker, setTimePicker] = useState(new Date());


  const [coordinate, setCoordinate] = useState({ latitude: "", longitude: "" });
  const [markerPosition, setMarkerPosition] = useState({ })

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    adresse: "",
    cp: "",
    ville: "",
    tel: "",
    email: "",
    message: "",
    selectedOption: "",
    date: "",
    heure: "",
    convertedAddress: convertCoordinatesToAddress,
    dateHeure: new Date(),
  });
  
  const setNom = (value) => {
    setFormData((prevData) => ({ ...prevData, nom: value }));
  };
  const setPrenom = (value) => {
    setFormData((prevData) => ({ ...prevData, prenom: value }));
  };
  const setAdresse = (value) => {
    setFormData((prevData) => ({ ...prevData, adresse: value }));
  };

  const setVille = (value) => {
    setFormData((prevData) => ({ ...prevData, ville: value }));
  };

  const setTel = (value) => {
    setFormData((prevData) => ({ ...prevData, tel: value }));
  };
  const setEmail = (value) => {
    setFormData((prevData) => ({ ...prevData, email: value }));
  };
  const setCp = (value) => {
    setFormData((prevData) => ({ ...prevData, cp: value }));
  };
  const setMessage = (value) => {
    setFormData((prevData) => ({ ...prevData, message: value }));
  };
  const setSelectedOption = (value) => {
    setFormData((prevData) => ({ ...prevData, selectedOption: value }));
  };
  const setConvertedAddress = (value) => {
    setFormData((prevData) => ({ ...prevData, convertedAddress: value }));
  };
  const setDate = (value) => {
    setFormData((prevData) => ({ ...prevData, date: value }));
  };
  const setHeure = (value) => {
    setFormData((prevData) => ({ ...prevData, heure: value }));
  };

  const navigation = useNavigation();

  const PlaceholderImage = require('../assets/images/formulaire.png');
  const PlaceholderImageLoading = require('../assets/images/log.gif');


  const alertMessages = {
    Voirie: "Mail envoyer à voirie@simplonville.co",
    Stationnement: "Mail envoyer à Stationnement@simplonville.co",
    Travaux: "Mail envoyer à Travaux@simplonville.co",
    Accident: "Mail envoyer à Accident@simplonville.co",
    Animaux: "Mail envoyer à Animaux@simplonville.co",
  };

  //   // Créez un objet d'e-mail sans pièce jointe
  //   const email = {
  //     subject: "Formulaire d'alerte",
  //     recipients: ["votre@adresse.email"], // Ajoutez l'adresse e-mail du destinataire ici
  //     body: `
  //       Sujet : ${formData.selectedOption}
  //       Nom : ${formData.nom}
  //       Prénom : ${formData.prenom}
  //       Adresse : ${formData.adresse}
  //       Code postal : ${formData.cp}
  //       Ville : ${formData.ville}
  //       Téléphone : ${formData.tel}
  //       Email : ${formData.email}
  //       Message : ${formData.message}
  //       Option sélectionnée : ${formData.selectedOption}
  //       Date : ${formData.date}
  //       Heure : ${formData.heure}
  //       Adresse convertie : ${formData.convertedAddress}
  //     `,
  //     isHTML: false,
  //   };

  //   // Utilisez la fonction sendMail pour envoyer l'e-mail
  //   Mailer.mail(email, (error, event) => {
  //     if (error) {
  //       alert("Impossible d'envoyer l'e-mail. Vérifiez les paramètres de messagerie de votre appareil.");
  //     }
  //   });
  // };
  
  const sendEmail = () => {
    // Définissez les destinataires, le sujet et le corps de l'e-mail
    const recipients = ['cdelobel.ext@simplon.co', 'j.well2014@yahoo.fr'];
    const subject = `Formulaire ${formData.selectedOption}`;
    const body = `
      Sujet : ${formData.selectedOption}
      Nom : ${formData.nom}
      Prénom : ${formData.prenom}
      Adresse : ${formData.adresse}
      Code postal : ${formData.cp}
      Ville : ${formData.ville}
      Téléphone : ${formData.tel}
      Email : ${formData.email}
      Message : ${formData.message}
      Option sélectionnée : ${formData.selectedOption}
      Date : ${formData.date}
      Heure : ${formData.heure}
      Adresse convertie : ${formData.convertedAddress}
    `;
  
    // Utilisez MailComposer.composeAsync pour ouvrir l'application de messagerie
    MailComposer.composeAsync({
      recipients,
      subject,
      body,
    })
      .then((result) => {
        if (result.status === 'sent') {
          // Le courrier électronique a été envoyé avec succès
          console.log('L\'e-mail a été envoyé avec succès');
        } else {
          // L'envoi de l'e-mail a été annulé ou a échoué
          console.log('L\'envoi de l\'e-mail a été annulé ou a échoué');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
      });
  };
  
  const handleValidation = () => {
    const { nom, prenom,email,adresse,cp,ville,tel,message,date,heure,selectedOption,convertedAddress } = formData;

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

     // Vous pouvez accéder à toutes les données du formulaire ici
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
  
  
   // Vérifiez tous les champs obligatoires
    const champsManquants = Object.keys(champsObligatoires).filter(champ => {
      const valeur = champsObligatoires[champ];
      return !valeur || valeur.trim() === ""; // Assurez-vous que le champ n'est pas vide ou composé uniquement d'espaces
    });
  
    if (isNaN(Number(cp)) || isNaN(Number(tel))) {
      champsManquants.push("Code postal ou Téléphone");
    }
  
    if (champsManquants.length > 0) {
      const champsManquantsMessage = `Veuillez remplir les champs vides : ${champsManquants.join(", ")}`;
      alert(champsManquantsMessage);
      return;
    }
  
   

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
    setCoordinate("")
  
    // Si le formulaire est valide, vous pouvez maintenant envoyer l'e-mail
    sendEmail();
    // Redirigez l'utilisateur vers la page d'accueil (index)
    navigation.navigate("index");
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

// Défini une référence à la carte
const mapRef = useRef(null);

// Convertit les coordonnées en adresse
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
  setMarkerPosition({ latitude, longitude });
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


const getLocation = async () => {   
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    
    setMarkerPosition({ 
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0002
    });
    if(locationPiker == false){
      setLocationPiker(true)
    }
    convertCoordinatesToAddress(location.coords.latitude,location.coords.longitude)
    console.log(location)
}

useEffect(() => {
  getLocation();
  if(locationPiker){
    setConvertedAddress()
  }
}, [locationPiker])


const handleResetPosition = async() => {
  let location = await Location.getCurrentPositionAsync({});

  // Réinitialisez la position actuelle
  setMarkerPosition({ 
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0002
  });
  console.log("handleResetPosition",markerPosition)
  convertCoordinatesToAddress(markerPosition.latitude,markerPosition.longitude)
};


  return (
    <ScrollView style={styles.container}>
      <ImageProvider>

        <View>
          <Text style={styles.titre}>FORMULAIRE D'ALERTE</Text>
          <ImageViewer style={styles.imageContainer} placeholderImageSource={PlaceholderImage}/>
        </View>
        <View>
          <Text style={styles.titre1}>Informations sur l'alerte</Text>
        </View>
        <View style={styles.containerForm} >
          <FormInput label=" ᗌ Indiquer un incident :" keyboardType="picker" selectedOption={formData.selectedOption} onOptionChange={handleOptionChange} />
          <Text style={[styles.label, {marginBottom: 40}]}> ᗌ Indiquer le lieu de l'incident :</Text>

          <View style={styles.mapContainer}>
            {locationPiker ? (
              <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
              >
              <Marker
                draggable
                coordinate={{
                  latitude: markerPosition.latitude,
                  longitude: markerPosition.longitude,
                }}
                title={formData.convertedAddress}
                onDragEnd={handleMapPress}  
              />
            </MapView>
            ) : (
              <View style={{paddingTop: 50}}>
                <ImageViewer placeholderImageSource={PlaceholderImageLoading}/>
              </View>
            )}  
          </View>
      
      {/* Affichage des coordonnées actuelles */}
      {locationPiker && (
        <View>
          <TouchableOpacity style={styles.resetButton} onPress={handleResetPosition}>
            <Text style={{color:"white"}}>Ma position</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Latitude :</Text>
            <Text style={[styles.dateHeureText, {color: "red"}]}>{markerPosition.latitude}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>Longitude :</Text>
            <Text style={[styles.dateHeureText, {color: "red"}]}>{markerPosition.longitude}</Text>
          </View>
          
          {formData.convertedAddress && (
            <View style={{backgroundColor:""}}>  
          <Text style={styles.label}> ᗌ Adresse :</Text>
          <Text style={[styles.adressText, {fontWeight: 'bold'}]}>{formData.convertedAddress}</Text>
          </View>
          )}
          
         
        </View>
       )}
      <View>

      <Text style={styles.label}> ᗌ Capture écran de l'incident :</Text>  
      <CameraScreen/>
      </View>  

      <View style={styles.infoContainer}>
      <FormInput label=" ᗌ A propos de l'incident :" value={formData.message} onChangeText={setMessage} multiline={true} numberOfLines={4} inputType="text" />
      
      {/* Bloc choix de la date */}
      <View style={[styles.dateContainer]}>
        {!showPiker && (
        <Pressable onPress={toggledatePiker} >
        <FormInput label=" ᗌ Date incident :" value={formData.date} onChangeText={setDate} inputType="date" toggledatePiker={toggledatePiker}/>
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

          <TouchableOpacity style= {[styles.button, styles.pickerButton, {backgroundColor: "#075985"}]} onPress={confirmIOSDate} >
            <Text style={[styles.buttonText, {color: "#fff"}]}>Enter</Text>
          </TouchableOpacity>
        </View>

        )}
        <Button label="Date actuelle" onPress={handleSetCurrentDate} theme={"currentDate"} />
      </View>

      {/* Bloc choix de l'heure */}
      <View style={styles.heureContainer}>
        {!showTimePicker && (
          <Pressable onPress={toggleTimePicker} >
          <FormInput label=" ᗌ Heure incident:" value={formData.heure} onChangeText={setHeure} inputType="time" toggleTimePiker={toggleTimePicker}/>
          </Pressable>  
        )}

        {showTimePicker && (
        <DateTimePiker style={styles.timePiker} mode="time" display="spinner" value={timePicker} onChange={onChangeTime}/>
        )}

        {showTimePicker && Platform.OS === "ios" && (
        <View style= {{flexDirection: "row", justifyContent:"space-around"}}>

          <TouchableOpacity style= {[styles.button,styles.pickerButton , {backgroundColor: "#11182711"}]} onPress={toggleTimePicker} >
            <Text style={[styles.buttonText]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {[styles.button, styles.pickerButton, {backgroundColor: "#075985"}]} onPress={confirmIOSTime} >
            <Text style={[styles.buttonText, {color: "#fff"}]}>Enter</Text>
          </TouchableOpacity>
        </View>

        )}
          <Button label="Heure actuelle" onPress={handleSetCurrentTime} theme={"currentDate"}/>
      </View>
      </View>
      
        <View style={styles.containerInfoPerso} >
          <Text style={styles.titre1}>Informations personnelles</Text>     
          <FormInput label=" ᗌ Nom :" value={formData.nom} onChangeText={setNom} inputType="text"/>
          <FormInput label=" ᗌ Prénom :" value={formData.prenom} onChangeText={setPrenom} inputType="text"/>
          <FormInput label=" ᗌ Adresse :" value={formData.adresse} onChangeText={setAdresse} inputType="text"/>
          <FormInput label=" ᗌ Code postale :" value={formData.cp} onChangeText={setCp} inputType="number"/>
          <FormInput label=" ᗌ Ville :" value={formData.ville} onChangeText={setVille} inputType="text"/>
          <FormInput label=" ᗌ Telephone :" value={formData.tel} onChangeText={setTel} inputType="number"/>
          <FormInput label=" ᗌ Email :" value={formData.email} onChangeText={setEmail} keyboardType="email-address" />
        </View>
      </View> 

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button label="Retour" theme="backToHome" />
        <Button  label="Valider" onPress={handleValidation} />
      </View>
      
      </ImageProvider>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  containerForm: {
    marginBottom: 50
  },
  containerInfoPerso: {
    backgroundColor:"#e6e8e9",
    borderRadius: 10
  },
  label: {
    fontSize: 22,
    marginBottom: 5,
  },
  datePicker: {
    width: 200,
    marginBottom: 10,
    color:"white"
  },
  titre:{
    fontSize: 25,
    height: 50,
    textAlign: "center",
    marginBottom: 50,
    color:"black",
    marginTop: 40,
    borderWidth: 4, 
    borderColor: "black", 
    borderRadius: 10,
    paddingTop: 5
  },
  titre1:{
    fontSize: 25,
    height: 50,
    marginBottom: 50,
    color:"black",
    marginTop: 40,
    textDecorationLine: 'underline',
    paddingLeft: 10
  },
  button: {
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#075985",
    width: 150
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
  adressText: {
    fontSize: 18,
    padding: 10,
    color: "#94bbe9",
    marginBottom: 50,
  },
  imageContainer: {
    height: 10,
    width: 50
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  },
  map: {
    width: "100%",
    height: 300,
  },
  coordinatesText: {
    fontSize: 16,
    marginTop: 10,
  },
  datePiker: {
    height: 120,
    marginTop: -10,
    backgroundColor:"white"
  },
  timePiker :{
    height: 120,
    marginTop: -10,
    backgroundColor:"white"
  },
  pickerButton: {
    paddingHorizontal: 20,
    backgroundColor:"white"
  },
  infoContainer : {
    marginTop: 40,
  },
  labelLieu: {
    fontSize: 20,
    textAlign: "left"
  },
  btnDateActu: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  resetButton:{
    height:50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: "#075985",
    width: 150,
  }
});
