import { Tabs } from 'expo-router' ; 
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
export default () => {    
    return (
        <Tabs 
            // style
            screenOptions = {{
                tabBarShowLabel: false ,
                headerStyle: {                               
                    backgroundColor: '#F5F5DC' , 
                    height: 300, 
                } ,   
                headerTitle: 'Welcome!',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 40,
                    paddingHorizontal: 130,     
                    color: '#708090',               
                },                
                headerTintColor: '#1E2632' , 
                tabBarInactiveTintColor : '#3A93AF',  
                tabBarActiveTintColor: '#3A4552', 
                tabBarStyle: { 
                    position: 'absolute', 
                    backgroundColor: '#02B0D1', 
                    height: 40, 
                    paddingTop: 20 , 
                },   
                tabBarIconStyle: { display: "none" }  ,        
            }}
        >           
        </Tabs>
    );      
};