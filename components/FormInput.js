// FormInput.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';


export default function FormInput({ 
  label,
  value,
  onChangeText,
  inputType,
  keyboardType,
  multiline,
  numberOfLines,
  selectedOption,
  onOptionChange, 
  toggledatePiker,
  toggleTimePiker
}) {

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      {
        inputType === "date" ? (
          // Afficher un champ de date avec le type approprié
          <TextInput
            style={[styles.input, {backgroundColor:"#e6e8e9"}]}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
            multiline={false}
            numberOfLines={1}
            placeholder="JJ/MM/AAAA"
            editable={false}
            onPressIn={toggledatePiker}
          />
        ) : inputType === "time" ? (
          // Afficher un champ d'heure avec le type approprié
          <TextInput
            style={[styles.input, {backgroundColor:"#e6e8e9"}]}
            value={value}
            onChangeText={onChangeText}
            keyboardType="numeric"
            multiline={false}
            numberOfLines={1}
            placeholder="HH:MM"
            editable={false}
            onPressIn={toggleTimePiker}
          />
        ) : keyboardType === "picker" ? (
        <Picker selectedValue={selectedOption} onValueChange={onOptionChange}>
          <Picker.Item label="Voirie" value="Voirie" />
          <Picker.Item label="Stationnement" value="Stationnement" />
          <Picker.Item label="Travaux" value="Travaux" />
          <Picker.Item label="Accident" value="Accident" />
          <Picker.Item label="Animaux" value="Animaux" />
        </Picker>
      ) : inputType === "map" ? (
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={onChangeText}
          keyboardType={inputType === "number" ? "numeric" : "default"}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={keyboardType !== "picker"}
        />) : (
        <TextInput
          style={styles.input}
          value={value}
          placeholder={label}
          onChangeText={onChangeText}
          keyboardType={inputType === "number" ? "numeric" : "default"}
          multiline={multiline}
          numberOfLines={numberOfLines}
          editable={keyboardType !== "picker"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    fontSize: 22,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: "#fff"
  },

});
