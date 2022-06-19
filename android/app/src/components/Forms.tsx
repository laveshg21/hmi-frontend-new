import React, { useEffect } from 'react';
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
  useWindowDimensions,
  PermissionsAndroid
} from 'react-native';
import MachinePicker from './MachinePicker.jsx'
import VariantPicker from './VariantPicker.jsx'
import { useState } from 'react';
import * as Location from 'expo-location';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


function useStyles(): { nav: { height: number; backgroundColor: string; }; text: { lineHeight: number; fontWeight: "bold"; color: string; fontSize: number; alignSelf: "center"; }; root: { flex: number; }; content: { flex: number; justifyContent: "flex-start"; marginTop: number; paddingHorizontal: number; paddingVertical: number; }; form: { alignItems: "center"; backgroundColor: string; borderRadius: number; flexDirection: "row"; height: number; paddingHorizontal: number; marginHorizontal: number; }; label: { color: string; fontSize: number; fontWeight: "400"; lineHeight: number; width: number; }; textInput: { color: string; flex: number; }; main: { backgroundColor: string; flex: number; }; title: { color: string; fontSize: number; fontWeight: "700"; lineHeight: number; marginLeft: number; }; buttonTitle: { color: string; fontSize: number; fontWeight: "600"; lineHeight: number; }; button: { backgroundColor: string; width: string; borderRadius: number; padding: number; alignItems: "center"; color: string; height: number; marginTop: number; }; } {
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
  

  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<any>(null);

  useEffect(() => { 
    (async () => {
      try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }
      let location1 = await Location.getCurrentPositionAsync({});
      setLocation(location1)
    }
    catch(error) {
      let status= Location.getProviderStatusAsync()
      if(!(await status).locationServicesEnabled){
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        )
        // if (granted !== PermissionsAndroid.RESULTS.GRANTED){
        //   alert("Location Permission is required")
        // }
      }
    }
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [operatorName, setoperatorName] = useState("")
  const [operatorID, setoperatorID] = useState("")
  const [IPAddress, setIPAddress] = useState("")
  const [machineName, setmachineName] = useState("")
  const [variant, setvariant] = useState("")
  const [partName, setpartName] = useState("")
  const [partno, setpartno] = useState("")
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {

    fetch("http://hmi-api.herokuapp.com/api/", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "operatorName": operatorName,
        "operatorID": operatorID,
        "IPAddress": IPAddress,
        "machineName": machineName,
        "variant": variant,
        "partName": partName,
        "partno": partno,
        "latitude" : location.coords.latitude,
        "longitude" : location.coords.longitude,
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
  <KeyboardAwareScrollView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    contentContainerStyle={styles.content}
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

                <TextInput
                placeholder='Operator Name'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  style={styles.textInput}
                  textContentType="username"
                  value={operatorName}
                  onChangeText={setoperatorName}

                />
              </View>
            </Pressable>
            <SizedBox height={28} />

            <Pressable>
              <View style={styles.form}>

                <TextInput
                placeholder='Operator ID no.'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
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

                <TextInput
                placeholder='IP Address'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
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
            <Text style={styles.title}>Machine Name</Text>
            <MachinePicker func={setmachineName} />
            <Text style={styles.title}>Variant</Text>
            <VariantPicker func={setvariant} />
            <SizedBox height={28} />

            <Pressable>
              <View style={styles.form}>

                <TextInput
                placeholder='Part Name'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
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

                <TextInput
                placeholder='Part Number'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
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

  </KeyboardAwareScrollView>
);
  };

export default Form;