import React, {useEffect,useState} from 'react';
import { useRouter, Link, Redirect,useSearchParams} from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View,Text,Image,Button,StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useForm, Controller} from 'react-hook-form' ; 
import { generatePin } from './pinGenerator.js';
import {db,auth} from '../../../firebase' ; 
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc,addDoc,getDoc,getDocs,updateDoc,getRef,collection} from 'firebase/firestore';
import {onSnapshot,query,where,orderBy,serverTimestamp} from 'firebase/firestore';
const random3DigitNumber = Math.floor(Math.random() * 900) + 100;
const random3Digit = random3DigitNumber.toString();

const AddReceiver = () => {
  const navigation = useRouter();
  const [adminID, setAdminID] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  useEffect(() => {
    const getUserCredentials = async () => {
      auth.onAuthStateChanged(async authUser => { // marked the callback function with the async keyword
        if (authUser) {
          setAdminEmail(authUser.email);
          setAdminID(authUser.uid);
          console.log("currentUser.uid is: " + authUser.uid);
          const devRef = doc(collection(db, 'Developer'), authUser.uid);
          const devDoc = await getDoc(devRef);
          const adminName = devDoc?.data()?.name;
          const adminPassword = devDoc?.data()?.pin;
          setAdminName(adminName);          
          setAdminPassword(adminPassword);
        }
      }); // added missing closing parenthesis here
    };
    getUserCredentials();
  }, [auth]); // added currentUser to the dependency array
  console.log("adminName: ",adminName)
  //=================================================
  const ReceiverPin = generatePin();
  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      pin : ReceiverPin,
      houseName : '',
      is_inhouse: false,
    },
  });

  // Use useEffect to update the value of the other field whenever the input value changes

  const builtUsername = 'Receiver-'+random3Digit;
  useEffect(() => {
      setValue('username', builtUsername.replace(/[()\s]/g, ''));
  }, [builtUsername, setValue]);


  const onCreatePress = async (data) => {
    const fakeUsername = Math.random().toString(36).substring(2, 10); // Generate a random string for username
    const email = `${fakeUsername}@yacatech.com`;
    const password = data.pin;   
    const moment = require('moment');    
    const currentTimeString = moment(currentTimeString).format("MMM D, YYYY h:mm A");     
    try {
      // add user information to Firebase Database
      const NewReceiverCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newReceiver_Uid = NewReceiverCredential.user.uid;
      //log back with the current Receiver
      await signInWithEmailAndPassword(auth, adminEmail, adminPassword);

      await setDoc(doc(db, "Receiver", `${newReceiver_Uid}`), {
        createdAt: serverTimestamp(),
        name: data.name,
        username: data.username,
        pin: data.pin, 
        email: email,
        password: password,
      });
      navigation.push(`/developerAccess/AddReceiver/ThankYou?receiverName=${data.name}`);
    } catch (error) {
      console.error(error);
      // TODO: Set error message state and render in UI
    }
  };

  if (true){
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={styles.textInputContainer}>
                        
              <Text style={styles.label}>Name</Text>
              <CustomInput 
                name = "name"
                placeholder = "e.g. John Smith"
                rules = {{required: ' ! '}}
                control = {control}
              />                               
              
              <Text style={styles.label}>Username</Text>
              <CustomInput
                name = "username" 
                placeholder = ""
                control = {control}
              />      

              <Text style={styles.label}>Pin</Text>                           
              <CustomInput
                name = "pin"
                placeholder = ""
                control = {control}
              />           

            </View>

            <CustomButton 
              text="Create" 
              onPress={handleSubmit(onCreatePress)} 
            />

          </View>
        </ScrollView>
    );
  }  
};

const styles = StyleSheet.create({
  root: {
    padding: 25,
    marginTop: 10,
    marginBottom: 200,   
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,  
  }, 
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 5, 
    color: '#3A4552',
  },  
  toggleswitchtext: {
    fontSize: 16,
    fontWeight: 'bold',
    fontStyle: 'italic',
    paddingLeft: 10,
    marginTop: 0,
    marginBottom: 5, 
    color: 'gray',
  }, 
  toggleswitchcontainter: {
    flexDirection: "row", 
    alignItems: "center" ,
    marginTop: 30,
  }, 
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },  
});
export default AddReceiver;