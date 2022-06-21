import React, { useEffect } from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import MachinePicker from './MachinePicker.jsx'
import VariantPicker from './VariantPicker.jsx'
import { useState } from 'react';
import * as Location from 'expo-location';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm from 'react-native-simple-radio-button';
import DateTimePickerModal from "react-native-modal-datetime-picker";


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
      flex: 1,
    },
    content: {
      flex: 1,
      height: '100%',
      justifyContent: 'flex-start',
      marginTop: 33,
      paddingHorizontal: 0,
      paddingVertical: 0,
      backgroundColor:'black'
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
      flex: 1,
      height:'100%'
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
  const nullDate = new Date();
  const [operatorName, setoperatorName] = useState("")
  const [operatorID, setoperatorID] = useState("")
  const [IPAddress, setIPAddress] = useState("")
  const [machineName, setmachineName] = useState("")
  const [variant, setvariant] = useState("")
  const [partName, setpartName] = useState("")
  const [partno, setpartno] = useState("")
  const [message, setMessage] = useState("");
  const [chosenOption, setChosenOption] = useState(''); //will store our current user options
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [date,setDate] = useState<Date>(nullDate);
  const [time, setTime] = useState<Date>(nullDate);
  const [datetime, setDatetime] = useState("")
  let handleSubmit = async (e) => {

    fetch("http://hmi-api.herokuapp.com/api/log", {
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
        "status":chosenOption,
        "time": datetime,
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

  const radio_props = [
    { label: (<View style={{marginRight:5,paddingHorizontal:5}}><Text style={{color: '#FFFFFF',fontSize:20,marginEnd:10}}>{'In'}</Text></View>), value: "In", size:8 },
    { label: (<Text style={{color: '#FFFFFF',fontSize:18}}>{'Out'}</Text>), value: "Out" },
  ];

  const showDatePicker = () => {
    setDate(nullDate);
    setTime(nullDate)
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const hideTimePicker = () => {
    formatDate(date,time);
    setTimePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDate(date);
    hideDatePicker();
    setDate(nullDate);
    setTime(nullDate);
    setTimePickerVisibility(true);
  };
  const handleConfirm2 = (time) => {
    setTime(time);
    hideTimePicker();
  };

  const formatDate = (date,time)=> {
    let dt = date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+" "+time.getHours()+":"+time.getMinutes();
    setDatetime(dt)
    return dt;
  }


return (

  <KeyboardAwareScrollView
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
            <View style={{marginLeft:15,display:'flex',flexDirection:'row',marginTop:10,justifyContent:'space-around'}}>
            <RadioForm
            formHorizontal={true}
            labelHorizontal={true}
            labelColor={'white'}
        radio_props={radio_props}
        initial="In" //initial value of this group
        onPress={(value) => {
          setChosenOption(value);
        }} //if the user changes options, set the new value
      />
      <TouchableOpacity onPress={showDatePicker}>
      <View style={{backgroundColor:'rgb(58, 58, 60)',height:50,width:200,borderRadius:4,marginTop:-6}}><Text style={{color: '#FFFFFF',fontSize:18}}>{datetime}</Text></View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirm2}
        onCancel={hideTimePicker}
      />
            </View>
            
            
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