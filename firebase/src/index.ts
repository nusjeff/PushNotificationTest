
import * as functions from "firebase-functions";
import {onSendAllNotification} from "./notification/sendPushNotification";
import {updateProfileFunction} from "./profile/updateProfileFunction";


module.exports = {
  updateProfile: functions.https.onCall(updateProfileFunction),
  sendNotification: functions.https.onCall(onSendAllNotification),

};
