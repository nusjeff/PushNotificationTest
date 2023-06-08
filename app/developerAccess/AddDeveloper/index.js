import React, {useEffect,useState} from 'react';
import { useRouter, Link, Redirect,useSearchParams} from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import {View,Text,Image,Button,StyleSheet,ScrollView,KeyboardAvoidingView} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import CustomToggleSwitch from './CustomToggleSwitch';
import { useForm, Controller} from 'react-hook-form' ; 
import { generatePin } from './pinGenerator.js';
import {db,auth} from '../../../firebase' ; 
import { createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc,addDoc,getDoc,getDocs,updateDoc,getRef,collection} from 'firebase/firestore';
import {onSnapshot,query,where,orderBy,serverTimestamp} from 'firebase/firestore';

const AddDeveloper = () => {
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
          const hostRef = doc(collection(db, 'Host'), authUser.uid);
          const hostDoc = await getDoc(hostRef);
          const adminName = hostDoc?.data()?.name;
          const adminPassword = hostDoc?.data()?.pin;
          setAdminName(adminName);          
          setAdminPassword(adminPassword);
        }
      }); // added missing closing parenthesis here
    };
    getUserCredentials();
  }, [auth]); // added currentUser to the dependency array
  console.log("adminPassword: ",adminPassword)
  //=================================================
  const HostPin = generatePin();
  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      pin : HostPin,
    },
  });

  // Use useEffect to update the value of the other field whenever the input value changes
  const builtUsername = 'Developer-1';

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
      const NewHostCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newHost_Uid = NewHostCredential.user.uid;
      //log back with the current host
      if (adminPassword) {
        await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
      }


      await setDoc(doc(db, "Developer", `${newHost_Uid}`), {
        createdAt: serverTimestamp(),
        name: data.name,
        username: data.username,
        pin: data.pin,
        email: email,
        password: password,
      });

      navigation.push(`/developerAccess/AddDeveloper/ThankYou?developerName=${data.name}`);
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
export default AddDeveloper;