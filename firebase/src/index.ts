
import * as functions from "firebase-functions";
import {updateProfileFunction} from "./profile/updateProfileFunction";
import {onSendAllNotification} from "./notification/sendPushNotification";

module.exports = {
  updateProfile: functions.https.onCall(updateProfileFunction),
  sendNotification: functions.https.onCall(onSendAllNotification),

};
