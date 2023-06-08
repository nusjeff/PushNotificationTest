import { Stack } from 'expo-router' ;
import { View, Text, Button, TouchableHighlight,StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default () => {
    return (
        <Stack 
            screenOptions = {{
                tabBarShowLabel: false ,
                headerStyle: { backgroundColor: '#F9E71C'} , 
                headerTintColor: '#1E2632' ,
                headerTitleStyle: { fontSize: 20, fontWeight: 'bold', color: '#3A4552' } ,  
                tabBarInactiveTintColor : '#3A93AF',  
                tabBarActiveTintColor: '#3A4552', 
                tabBarStyle: { 
                    position: 'absolute', 
                    backgroundColor: '#02B0D1', 
                    height: 90, 
                    paddingTop: 20 , 
                },                                             
            }}
        >
            <Stack.Screen name="main" options = {{
                headerShown: false,                
            }}/>

            <Stack.Screen name="AddSender" options = {{
                headerShown: false,
            }}/>  

            <Stack.Screen name="AddReceiver" options = {{
                headerShown: false,
            }}/>             
 
            <Stack.Screen name="AddDeveloper" options = {{
                headerShown: false,
            }}/>  
        </Stack>          
    );
};
