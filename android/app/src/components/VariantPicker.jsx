import React, { Component } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'; 

const VariantPicker=(props)=> {
  
   const [variant, setvariant] = useState("")

      return (
         <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
         <View style={styles.content}>
            <Picker style={styles.picker} selectedValue={variant} onValueChange={value=>{setvariant(value);props.func(value)}}>
               <Picker.Item label = "Select" value = "Select" />
               <Picker.Item label = "Variant 1" value = "Variant 1" />
               <Picker.Item label = "Variant 2" value = "Variant 2" />
               <Picker.Item label = "Variant 3" value = "Variant 3" />
               <Picker.Item label = "Variant 4" value = "Variant 4" />
            </Picker>
         </View>
         </KeyboardAvoidingView>
      )
}
export default VariantPicker

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
      marginBottom:10,
      flexDirection: 'row',
      height:48,
      marginHorizontal:15
   },
   content: {
      borderRadius:8,
   }
})