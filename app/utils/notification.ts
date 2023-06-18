import { openSettings } from 'expo-linking';
import * as Notifications from 'expo-notifications';
import { Alert, Platform } from "react-native";

 export const registerForPushNotifications = async() : Promise<string> => {

  let token : string

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus.toString() !== 'granted') {
      Alert.alert(
        'Error',
        'Sorry, we need your permission to enable Push Notifications. Please enable it in your privacy settings.',
        [
          {
            text: 'OK',
          },
          {
            text: 'Open Settings',
            onPress: async () => openSettings(),
          },
        ]
      );
      return undefined;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Final Token",token);
 
  return token;
}
