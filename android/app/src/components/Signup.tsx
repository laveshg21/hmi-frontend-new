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
import * as Location from 'expo-location';
import FingerprintScanner from 'react-native-fingerprint-scanner';


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
            setFirstName("");
            setLastName("");
            setAadharNo("");
            setMobileNo("");
            setEmailId("");
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
          <Text style={styles.title}>Create a New Account</Text>

          <SizedBox height={8} />

          <SizedBox height={32} />

          <Pressable>
            <View style={styles.form}>
              <Text style={styles.label}>First Name</Text>

              <TextInput
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
              <Text style={styles.label}>Last Name</Text>

              <TextInput
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
              <Text style={styles.label}>Aadhar No.</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                maxLength={12}
                value={AadharNo}
                onChangeText={setAadharNo}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>
              <Text style={styles.label}>Mobile No.</Text>

              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                style={styles.textInput}
                textContentType="password"
                maxLength={10}
                value={MobileNo}
                onChangeText={setMobileNo}
              />
            </View>
          </Pressable>

          <SizedBox height={16} />

          <Pressable>
            <View style={styles.form}>
              <Text style={styles.label}>Email Id</Text>

              <TextInput
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

          <TouchableOpacity>
          <View style={styles.forgotPasswordContainer}>
            <Text style={styles.textButton} onPress={() => navigation.navigate('LoginPage')}>Already have an account?  Sign in</Text>
          </View>
          </TouchableOpacity>

          <SizedBox height={16} />

          <TouchableOpacity onPress={handleSubmit}>
            <View style={styles.button}>
              <Text style={styles.buttonTitle}>Continue</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default Signup;


