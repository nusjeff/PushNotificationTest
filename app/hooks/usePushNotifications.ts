import { useCallback, useEffect, useRef, useState } from "react";
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  removeNotificationSubscription,
  setNotificationChannelAsync,
  setNotificationHandler,
  Subscription,
  Notification
} from 'expo-notifications';
import { registerForPushNotifications } from '../utils/notification';
import { PushNotificationsToAll, UserType } from "../../firebase/src/shared/interfaces";
import { functions } from "../services/functions";

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const usePushNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState<string>('');
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<UserType | null>(null);

  const [notification, setNotification] = useState<Notification | null>(null);
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();


  useEffect(() => {
    registerForPushNotifications().then(token => setExpoPushToken(token));

    notificationListener.current = addNotificationReceivedListener(currentNotification => setNotification(currentNotification));

    responseListener.current = addNotificationResponseReceivedListener(response => {
      console.log(response);

    });

    return () => {
      removeNotificationSubscription(notificationListener.current);
      removeNotificationSubscription(responseListener.current);
    };
  }, []);


  const onSetNotification = useCallback(async () => {
    try{
      const response = await functions.updateProfile({
        id: userId,
        notificationToken: expoPushToken,
        userType: userType
      })

    }catch(e){
      console.log("onSetNotification", e)
    }
   
  }, [userType, userId, expoPushToken])

  useEffect(() => {
    if (userType && userId && expoPushToken && expoPushToken.length > 0) {
      onSetNotification()
    }
  }, [userType, userId, expoPushToken])


  const onSendNotification = useCallback(({ message }: { message: string }) => {
    const data: PushNotificationsToAll = {
      userType,
      userId,
      message
    }
    functions.sendNotification(data)
  }, [])


  return {
    setUserId,
    setUserType,
    onSendNotification
  }
}
export default usePushNotifications
