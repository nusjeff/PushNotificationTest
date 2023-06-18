import {getFirestore} from "firebase-admin/firestore";
import {Profile, UpdateProfileDTO, UserType} from "../shared/interfaces";
import {initializeApp} from "firebase-admin/app";

initializeApp();
const db = getFirestore();

export const onUpdateProfile = async (data: UpdateProfileDTO) => {
  const userRef = db.collection(data.userType).doc(data.id);
  const response = await userRef.update({
    notificationToken: data.notificationToken,
  });
  return response;
};

export const getAllProfile = async (userType:UserType) =>{
  const profiles: Profile[] = [];
  const userList = await db.collection(userType).get();
  userList.docs.forEach((doc) =>{
    if (doc.data()) {
      profiles.push(doc.data() as Profile);
    }
  });
  return profiles;
};
