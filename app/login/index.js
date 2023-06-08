import React, {useState, useEffect} from 'react';
import { useRouter, Link, Redirect } from 'expo-router';
import {SafeAreaView, View,Text, Image, ActivityIndicator, TextInput,Button,KeyboardAvoidingView, StyleSheet,ScrollView, Alert} from 'react-native';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useForm, Controller} from 'react-hook-form' ; 
import { auth,db } from '../../firebase' ; 
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc,setDoc,addDoc,getDoc,getDocs,updateDoc,getRef,collection} from 'firebase/firestore';
import {onSnapshot,query,where,orderBy,serverTimestamp} from 'firebase/firestore';


const login = () => {
  // we can check if we need to wait for loading
  const [loading, setLoading] = useState(false) ; 

  const navigation = useRouter();

  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
      // username : ' ',
    },
  });

  // check if the user is already signed in: 
  useEffect(() => {
    const getUsername = async () => {
      auth.onAuthStateChanged(async authUser => { // marked the callback function with the async keyword
        if (!authUser) {
          setLoading(false);
        }
        if (authUser) {
          console.log("currentUser.uid is: " + authUser.uid);
          const ReceiverRef = doc(collection(db, 'Receiver'), authUser.uid);
          const SenderRef = doc(collection(db, 'Sender'), authUser.uid);
          let ReceiverUsername, SenderUsername;
          
          try {
            const ReceiverDoc = await getDoc(ReceiverRef);
            ReceiverUsername = ReceiverDoc?.data()?.username;
          } catch (error) {
            console.log("Receiver not found", error);
          }

          try {
            const SenderDoc = await getDoc(SenderRef);
            SenderUsername = SenderDoc?.data()?.username;
          } catch (error) {
            console.log("Sender not found", error);
          }

          const username  = ReceiverUsername || SenderUsername ;  
          if (username) {
            if (username?.substring(0, 1).toUpperCase() === "S") {
              setLoading(true);
              navigation.push('/senderAccess');
            } else if (username?.substring(0, 1).toUpperCase() === "R") {
              setLoading(true);
              navigation.push('/receiverAccess');
            } else {
            return;
            } 
          }
       
        }
      }); // added missing closing parenthesis here
    };
    getUsername();
  }, [auth, navigation]); // added currentUser to the dependency array

  const [authError, setAuthError] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUsernameEmail = async () => {
      if (watch('username')) {
        let userQuery;
        if (watch('username').substring(0, 1).toUpperCase() === "S") {
          userQuery = query(collection(db, 'Sender'), where('username', '==', watch('username')));
        } else if (watch('username').substring(0, 1).toUpperCase() === "R") {
          userQuery = query(collection(db, 'Receiver'), where('username', '==', watch('username')));
        } else if (watch('username').substring(0, 1).toUpperCase() === "D") {
          userQuery = query(collection(db, 'Developer'), where('username', '==', watch('username')));          
        } else {
          return;
        }

        const querySnapshot = await getDocs(userQuery);
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          const email = docData.email;
          setUserEmail(email);
        }
      }
    }

    getUsernameEmail();
  }, [watch('username')]);

  const onSignInPress = async (data) => {
    if (loading) {
      return;
    }
    setLoading(true);
    console.log("EMAIL: " + userEmail)
    const password = data.pin;
    signInWithEmailAndPassword(auth, userEmail, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoading(false);
        if (data.username.substring(0, 1).toUpperCase() === "S") {
          navigation.push('/senderAccess');
        } else if (data.username.substring(0, 1).toUpperCase() === "R") {
          navigation.push('/receiverAccess');
        } else if (data.username.substring(0, 1).toUpperCase() === "D") {
          navigation.push('/developerAccess/main');
        }         
      })
      .catch((error) => {
        setAuthError('Incorrect username or pin, please try again!');
        setLoading(false);
      });
    ///////////////////////////
    // setLoading(false); 
    // if (data.username.substring(0, 1) === "D") {
    //   navigation.push('/developerAccess/main');
    // } else if (data.username.substring(0, 1) === "S") {
    //   navigation.push('/senderAccess');
    // }  
    // else if (data.username.substring(0, 1) === "R") {
    //   navigation.push('/receiverAccess');
    // }      
    //////////////////////////
  };

  return (
    <KeyboardAvoidingView 
      behavior = {Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset = {200}
    >     
    <SafeAreaView>
      {loading ? 
        (
          <View>
            <ActivityIndicator size="large" color="gray" />
          </View>
        ): 
        (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.root}>
                <CustomInput
                  placeholder = "username"
                  rules = {{required: 'username is required'}}
                  control = {control}
                />
                <CustomInput
                  placeholder = "pin"
                  rules = {{
                    required: 'pin is required',                 
                  }}
                  control = {control}
                  secureTextEntry
                />
                
                {authError && <Text style={styles.errorText}>{authError}</Text>}

                <CustomButton 
                  text={loading ? "Loading..." : "Sign In"}
                  onPress={handleSubmit(onSignInPress)} 
                />      

              </View>
            </ScrollView>
        )
      }  
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginVertical: 5,
    fontSize: 14, 
    color: 'red',
    alignSelf: 'stretch',
  }
});
export default login;