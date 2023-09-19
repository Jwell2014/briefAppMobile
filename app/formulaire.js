import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Button from "../components/Button";
import FormInput from "../components/FormInput"; 

export default function Formulaire() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleValidation = () => {
    // Traitez les données du formulaire ici.
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Email:", email);
    console.log("Message:", message);
    alert('ok')

    // Réinitialisez les champs après la soumission du formulaire
    setNom("");
    setPrenom("");
    setEmail("");
    setMessage("");
  };

  return (
    <View style={styles.container}>
      <FormInput label="Nom :" value={nom} onChangeText={setNom} />
      <FormInput label="Prénom :" value={prenom} onChangeText={setPrenom} />
      <FormInput label="Email :" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <FormInput label="Message :" value={message} onChangeText={setMessage} multiline={true} numberOfLines={4} />
      <Button label="Valider" onPress={handleValidation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
