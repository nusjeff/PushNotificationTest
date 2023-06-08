import { Stack, useRouter } from 'expo-router';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../../../firebase' ; 
import { signOut } from 'firebase/auth'; 

export default () => {
    const user = auth.currentUser ; 
    const navigation = useRouter();
    const SignOutCurrentUser = () => {
        signOut(auth)
        .then(() => {
            navigation.push('/login') ; 
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }
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
            <Stack.Screen name="index" options = {{
                title: "Dashboard",
                headerTitleStyle: styles.headerText , 
                headerRight: () => (
                <TouchableHighlight onPress={SignOutCurrentUser}>
                    <View style={styles.signOutIcon}> 
                        <MaterialCommunityIcons name="location-exit" size={28} color="#3A4552" />                        
                    </View>                                    
                </TouchableHighlight>
                ), 
            }}/>           
        </Stack>          
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#3A4552',
    },                        
    signOutIcon: {
        alignItems:'center',
        marginRight: 10 , 
    }
});