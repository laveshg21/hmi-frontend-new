import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import RNPickerSelect from "react-native-picker-select";
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react';

const MachinePicker=(props)=> {

   const [machine, setmachine] = useState("")

      return (
         <View style={styles.content}>
            <Picker placeholder={{ label: 'Select', value:'null' }} style={styles.picker} selectedValue={machine} onValueChange={value=>{setmachine(value);props.func(value)}}>
               <Picker.Item id='select' label = "Select" value = "Select" />
               <Picker.Item label = "siemens 840" value = "siemens 840" />
               <Picker.Item label = "siemens 840DSL" value = "siemens 840DSL" />
               <Picker.Item label = "Fanuc F1" value = "Fanuc F1" />
               <Picker.Item label = "Fanuc F2" value = "Fanuc F2" />
               <Picker.Item label = "Heidenhein 630d" value = "Heidenhein 630d" /> 
               </Picker>
         </View>
      )
}
export default MachinePicker

const styles = StyleSheet.create({
   text: {
      fontSize: 30,
      alignSelf: 'center',
      color: 'red'
   },
   picker: {
      backgroundColor:'rgb(58, 58, 60)',
      color:'rgba(235, 235, 245, 0.6)',
      marginTop:16,
      marginBottom:30,
      flexDirection: 'row',
      height:48,
      marginHorizontal:15,
   },
   content: {
      borderWidth: 1,
    borderRadius: 20,
   }
})