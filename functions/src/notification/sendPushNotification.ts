import type {ExpoPushMessage} from "expo-server-sdk";
import {Expo} from "expo-server-sdk";
import {PushNotificationsToAll, SendPushNotification} from "../shared/interfaces";
import {getAllProfile} from "../database";

const expo = new Expo({accessToken: process.env.EXPO_ACCESS_TOKEN});

const sendPushNotification = async ({
  pushToken,
  message,
  title,
}: SendPushNotification): Promise<void> => {
  const messages: ExpoPushMessage[] = [];

  if (!Expo.isExpoPushToken(pushToken)) {
    console.error(`Push token ${pushToken} is not a valid Expo push token`);
    return;
  }
  messages.push({
    to: pushToken,
    sound: "default",
    body: message,
    title: title,

  });

  try {
    await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error(error);
  }
};

export const onSendAllNotification = async (input: PushNotificationsToAll) => {
  try {
    const listProfile = await getAllProfile(input.userType == "Sender" ? "Receiver" : "Sender");
    listProfile.forEach((profile) => {
      if (profile.notificationToken) {
        sendPushNotification({
          pushToken: profile.notificationToken,
          message: input.message, title: input.title,
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

