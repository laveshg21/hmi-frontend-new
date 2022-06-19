import React,{ useState,useEffect,Component } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
  View
} from 'react-native';


  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: 'rgb(93, 95, 222)',
      borderRadius: 8,
      height: 48,
      justifyContent: 'center',
    },
    buttonTitle: {
      color: '#FFFFFF',
      fontSize: 17,
      fontWeight: '600',
      lineHeight: 22,
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 16,
      paddingVertical: 32,
    },
    forgotPasswordContainer: {
      alignItems: 'center',
      marginBottom: 10
    },
    form: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
    },
    label: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      width: 80,
    },
    root: {
      backgroundColor: '#000000',
      flex: 1,
    },
    safeAreaView: {
      flex: 1,
    },
    subtitle: {
      color: 'rgba(235, 235, 245, 0.6)',
      fontSize: 17,
      fontWeight: '400',
      lineHeight: 22,
      alignSelf:'center'
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      
    },
    textInput: {
      alignItems: 'center',
      backgroundColor: 'rgb(58, 58, 60)',
      borderRadius: 8,
      flexDirection: 'row',
      height: 48,
      paddingHorizontal: 16,
      color:'#FFFFFF',
      textAlign:'center',
      width:120,
      alignSelf:'center',
      fontSize:20
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
      alignSelf:'center'
    },
    text:{
      color: "green",
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf:'center',
      textAlign:'center'
    }
  });

interface Props {
  height?: number;
  width?: number;
}

const SizedBox: React.FC<Props> = ({ height, width }) => {
  return <View style={{ height, width }} />;
};

const LoginPage=({navigation})=> {


  const [otp, setotp] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {

    fetch("http://hmi-api.herokuapp.com/api/otp", {
      method: "POST",
      headers: {
        'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        otp:otp
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('Fetch Success==================');
        console.log(responseData);
        if(responseData["success"]){
          setMessage(`Account Verified Successfully ! Click here to proceed to Login Page.`)        }
        else{
          setMessage("Account not Verified.")
        }
        setotp("")
      })
      .catch((error) => console.log(error))
  }

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <Text style={styles.title}>Verify Your Account</Text>

          <SizedBox height={30} />

          <Text style={styles.subtitle}>An OTP is sent to the registered mobile number and email ID. Please enter it to proceed</Text>

          <SizedBox height={32} />

          <TextInput style={styles.textInput} value={otp} onChangeText={setotp}></TextInput>

          <SizedBox height={32} />

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Continue</Text>
            </View>
            <SizedBox height={32} />
            <View>{message ? <Text style={styles.text} onPress={()=>navigation.navigate("LoginPage")}>{message}</Text> : null}</View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginPage;


