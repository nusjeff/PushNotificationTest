import { TouchableOpacity, View, Text ,StyleSheet} from "react-native";
import React from "react" ;
import { useRouter, useSearchParams } from "expo-router";

const ThankYou = () => {
  const navigation = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Text style={styles.message}> 
            A new message was sent by sender.
        </Text>
      </View>  
      <TouchableOpacity  
        style={styles.button}  
        onPress={() => navigation.push('/senderAccess')}
      >
        <Text style={styles.buttonTitle}>Go Back to Sender Side</Text>
      </TouchableOpacity>      
    </View>
  );
};


const styles = StyleSheet.create({
    container: {
        flex: 1 , 
        justifyContent: 'center' ,
        alignItems:'center' ,
    } ,
    messageContainer: {
        borderBottomColor: 'white' ,
        borderRadius: 25 , 
        marginBottom: 60 , 
        width: '90%',
    } ,   
    message: {
        fontSize: 22 , 
        fontWeight: 'bold' ,
        textAlign: 'center',
        // alignSelf: 'center' ,
        padding: 10,
        lineHeight: 40,
    } ,  
    button:{
        width: '60%',
        justifyContent: 'center',
        height: 50, 
        padding: 15,
        marginVertical: 20,
        marginBottom: 110,
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#3A4552',        
    },
    buttonTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F5F5F5',      
    },

});
export default ThankYou;