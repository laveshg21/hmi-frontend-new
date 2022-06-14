import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import MachinePicker from './MachinePicker.jsx'
import VariantPicker from './VariantPicker.jsx'
import { useState } from 'react';

function useStyles() {
  return StyleSheet.create({
    nav: {
      height: 58,
      backgroundColor: 'rgb(93, 95, 222)'
    },
    text: {
      lineHeight: 55,
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontSize: 20,
      alignSelf: 'center'
    },
    root: {
      flex: 1
    },
    content: {
      flex: 1,
      justifyContent: 'flex-start',
      marginTop: 33,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
      marginHorizontal: 15
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 120,
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    main: {
      backgroundColor: 'black',
      flex: 1
    },
    title: {
      color: 'rgba(235, 235, 245, 0.8)',
      fontSize: 18,
      fontWeight: '700',
      lineHeight: 20,
      marginLeft: 10
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
    },
    button: {
      backgroundColor: 'rgb(93, 95, 222)',
      width: "28%",
      borderRadius: 8,
      padding: 0,
      alignItems: "center",
      color: "white",
      height: 50,
      marginTop: 30
    }
  })


}

interface Props {
  height?: number;
  width?: number;
}

const SizedBox: React.FC<Props> = ({ height, width }) => {
  return <View style={{ height, width }} />;
};

const Form = ({ navigation }) => {
  const styles = useStyles();

  const [operatorName, setoperatorName] = useState("")
  const [operatorID, setoperatorID] = useState("")
  const [IPAddress, setIPAddress] = useState("")
  const [machineName, setmachineName] = useState("")
  const [variant, setvariant] = useState("")
  const [partName, setpartName] = useState("")
  const [partno, setpartno] = useState("")
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {

    fetch("https://hmi-api.herokuapp.com/api", {
      method: "POST",
      body: JSON.stringify({
        "operatorName": operatorName,
        "operatorID": operatorID,
        "IPAddress": IPAddress,
        "machineName": machineName,
        "variant": variant,
        "partName": partName,
        "partno": partno,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Fetch Success==================');
        console.log(responseData);
        setoperatorName("");
        setoperatorID("");
        setIPAddress("");
        setmachineName("");
        setvariant("");
        setpartName("");
        setpartno("");
        setMessage("User created successfully");
      })
      .catch((error) => console.log(error))
  }

return (
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.content}
  >
    <ScrollView>
      <View style={styles.root}>
        <SafeAreaView style={styles.root}>
          <View style={styles.main}>
            <View style={styles.nav}>
              <Text style={styles.text}>HMI APP</Text>
            </View>
            <SizedBox height={32} />

            <Pressable>
              <View style={styles.form}>
                <Text style={styles.label}>Operator Name</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={operatorName}
                  onChangeText={setoperatorName}
                  hitSlop={{ top: 30, left: 20 }}
                />
              </View>
            </Pressable>
            <SizedBox height={28} />

            <Pressable>
              <View style={styles.form}>
                <Text style={styles.label}>Operator ID no.</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={operatorID}
                  onChangeText={setoperatorID}
                />
              </View>
            </Pressable>
            <SizedBox height={28} />

            <Pressable>
              <View style={styles.form}>
                <Text style={styles.label}>IP Address</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={IPAddress}
                  onChangeText={setIPAddress}
                />
              </View>
            </Pressable>
            <SizedBox height={28} />
            {/* <Text style={styles.title}>Machine Name</Text>
            <MachinePicker func={setmachineName} />
            <Text style={styles.title}>Variant</Text>
            <VariantPicker func={setvariant} />
            <SizedBox height={28} /> */}

            <Pressable>
              <View style={styles.form}>
                <Text style={styles.label}>Part Name</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={partName}
                  onChangeText={setpartName}
                />
              </View>
            </Pressable>
            <SizedBox height={28} />

            <Pressable>
              <View style={styles.form}>
                <Text style={styles.label}>Part Number</Text>

                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={partno}
                  onChangeText={setpartno}
                />
              </View>
            </Pressable>
            <SizedBox height={16} />
            <View style={{ flexDirection: 'row', justifyContent: "space-around", paddingBottom:20 }}>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <View >
                  <Text style={[styles.text, { lineHeight: 45 }]}>Save</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} >
                <View >
                  <Text style={[styles.text, { lineHeight: 45 }]}>Clear</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <View >
                  <Text style={[styles.text, { lineHeight: 45 }]} onPress={() => navigation.goBack()}>Cancel</Text>
                </View>
              </TouchableOpacity>
              {/* <View>{message ? <Text style={{color:'green'}}>{message}</Text> : null}</View> */}
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ScrollView>
  </KeyboardAvoidingView>
);
  };

export default Form;