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
    },
    textButton: {
      color: '#FFFFFF',
      fontSize: 15,
      fontWeight: '400',
      lineHeight: 20,
      
    },
    textInput: {
      color: '#FFFFFF',
      flex: 1,
    },
    title: {
      color: '#FFFFFF',
      fontSize: 28,
      fontWeight: '700',
      lineHeight: 34,
    },
    text:{
      color: "red",
      fontSize: 18,
      fontWeight: 'bold',
      alignSelf:'center'
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

  const [FirstName, setFirstName] = useState("")
  const [AadharNo, setAadharNo] = useState("")
  const [message, setMessage] = useState("");

  let handleSubmit = async () => {

      fetch("http://hmi-api.herokuapp.com/api/login", {
        method: "POST",
        headers: {
          'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "firstname": FirstName,
          "aadharno": AadharNo
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log('Fetch Success==================');
          console.log(responseData);
          if(FirstName=="" || AadharNo==""){
            setMessage("Name or Aadhar no. cannot be empty")
          }
          else if(responseData["success"]==true){
            setMessage("")
            navigation.navigate("Form")
          }
          else{
            console.log("Invalid Credentials")
            setMessage("Invalid Credentials")
          }
          setFirstName("");
          setAadharNo("");
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
          <Text style={styles.title}>Welcome back!</Text>

          <SizedBox height={8} />

          <Text style={styles.subtitle}>Sign in to your account</Text>

          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>
              {/* <Text style={styles.label}>First Name</Text> */}

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                style={styles.textInput}
                textContentType="username"
                value={FirstName}
                onChangeText={setFirstName}
                placeholder="Please enter Your Name here"
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>
              {/* <Text style={styles.label}>Aadhar no.</Text> */}

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                maxLength={12}
                value={AadharNo}
                onChangeText={setAadharNo}
                keyboardType='numeric'
                placeholder='Please enter Your Aadhar Number here'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <View style={styles.forgotPasswordContainer} >
            <Text style={styles.textButton} >Don't have an account?  Sign up</Text>
          </View>
          </TouchableOpacity>

          <SizedBox height={16} />

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Continue</Text>
            </View>
          </TouchableOpacity>
          <SizedBox height={18}/>
          <View>{message ? <Text style={styles.text}>{message}</Text> : null}</View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default LoginPage;


