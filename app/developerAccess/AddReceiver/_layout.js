import { Stack, useRouter } from 'expo-router';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default () => {
    const navigation = useRouter();
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
                title: "New Receiver",
                headerTitleStyle: styles.headerText , 
                headerLeft: () => (
                <TouchableHighlight onPress={() => navigation.push('/developerAccess/main/')}>
                    <View style={{flexDirection:'row', alignItems:'center'}}> 
                        <Ionicons name="chevron-back" size={24} color="black" />
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
});