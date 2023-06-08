import { Stack } from 'expo-router' ;
import { useRouter } from "expo-router";
export default () => {
    const router = useRouter();

    return (
        <Stack screenOptions={{ headerShown: false,}}>
            <Stack.Screen name="index" options = {{
                headerShown: false , 
            }} />  

            <Stack.Screen name="senderAccess" options = {{
                headerShown: false , 
            }} />

            <Stack.Screen name="receiverAccess" options = {{
                headerShown: false , 
            }} />    

            <Stack.Screen name="developerAccess" options = {{
                headerShown: false , 
            }} />                       

            <Stack.Screen name="login" options = {{
                headerShown: false , 
            }} />   
        </Stack>
    );
};