import { useRouter } from 'expo-router';
import { collection, doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../../firebase';
import usePushNotifications from '../hooks/usePushNotifications';
import CustomButton from './CustomButton';
import CustomInput from './CustomInput';

const receiverAccess = () => {
  const navigation = useRouter();
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const {setUserId, setUserType, setTitle, onSendNotification} = usePushNotifications()

  useEffect(() => {
    const getUserCredentials = async () => {
      auth.onAuthStateChanged(async authUser => { // marked the callback function with the async keyword
        if (authUser) {
          setAdminEmail(authUser.email);
          setUserId(authUser.uid);
          console.log("currentUser.uid is: " + authUser.uid);
          const receiverRef = doc(collection(db, 'Receiver'), authUser.uid);
          const receiverDoc = await getDoc(receiverRef);
          const adminName = receiverDoc?.data()?.name;
          const adminPassword = receiverDoc?.data()?.pin;
          setAdminName(adminName);          
          setAdminPassword(adminPassword);
          setTitle(`You got message from ${adminName}`)

        }
      }); // added missing closing parenthesis here
    };
    setUserType('Receiver')
    getUserCredentials();
  }, [auth]); // added currentUser to the dependency array
  console.log("adminPassword: ",adminPassword)
  //=================================================
  const {control, handleSubmit, watch, setValue} = useForm({
    defaultValues: {
    },
  });

  const onCreatePress = async (data) => {
    if(data?.name){
      onSendNotification({message: data.name})

    }
      navigation.push(`/receiverAccess/ThankYou`);
  };

  if (true){
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
            <View style={styles.textInputContainer}>
                        
              <Text style={styles.label}>{adminName}'s Message</Text>
              <CustomInput 
                name = "name"
                placeholder = ""
                rules = {{required: ' ! '}}
                control = {control}
              />                                                    

            </View>

            <CustomButton 
              text="Send Message" 
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
export default receiverAccess;