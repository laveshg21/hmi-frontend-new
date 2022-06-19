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
  ScrollView,
  Linking,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


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
      flex: 1
    },
    safeAreaView: {
      flex: 1
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

const Signup=({navigation})=> {

    const [FirstName, setFirstName] = useState("")
    const [LastName, setLastName] = useState("")
    const [AadharNo, setAadharNo] = useState("")
    const [EmailId, setEmailId] = useState("")
    const [MobileNo, setMobileNo] = useState("")
    const [message, setMessage] = useState("");


    let handleSubmit = async (e) => {

        fetch("http://hmi-api.herokuapp.com/api/signup", {
          method: "POST",
          headers: {
            'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname: FirstName,
            lastname: LastName,
            aadharno: AadharNo,
            mobile: MobileNo,
            email: EmailId
          }),
        })
          .then((response) => response.json())
          .then((responseData) => {
            console.log('Fetch Success==================');
            console.log(responseData);
            if(FirstName=="" || LastName=="" || AadharNo=="" || MobileNo=="" || EmailId==""){
              setMessage("A required Field is missing")
            }
            else{
              setFirstName("");
            setLastName("");
            setAadharNo("");
            setMobileNo("");
            setEmailId("");
            navigation.navigate("SendOTP")
            }
          })
          .catch((error) => console.log(error))
      }
    
  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          contentContainerStyle={styles.content}>
            <ScrollView>
              <SizedBox height={110}/>

          <Text style={styles.title}>Create a New Account</Text>

          <SizedBox height={8} />

          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                placeholder='Enter Your First Name'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                style={styles.textInput}
                textContentType="username"
                value={FirstName}
                onChangeText={setFirstName}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                placeholder='Enter Your Last Name'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="username"
                value={LastName}
                onChangeText={setLastName}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                placeholder='Enter Your Aadhar No.'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                maxLength={12}
                value={AadharNo}
                onChangeText={setAadharNo}
                keyboardType='number-pad'
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                placeholder='Enter Your Mobile No.'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                maxLength={10}
                value={MobileNo}
                onChangeText={setMobileNo}
                keyboardType='number-pad'
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>

              <TextInput
                placeholder='Enter Your Email ID'
                placeholderTextColor="rgba(235, 235, 245, 0.6)"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                value={EmailId}
                onChangeText={setEmailId}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
          <View style={styles.forgotPasswordContainer} >
            <Text style={styles.textButton} >Already have an account?  Sign in</Text>
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
          </ScrollView>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Signup;


