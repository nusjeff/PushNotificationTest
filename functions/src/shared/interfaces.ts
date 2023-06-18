export enum ServerError {
  UNAUTHENTICATED = "UNAUTHENTICATED",
  INVALID_ARGUMENTS = "INVALID_ARGUMENTS",
}

export type CloudFunctionResult<T> = Promise<{
  success: boolean
  payload?: T
  error?: ServerError
  errorMessage?: string
}>


export type UserType = "Sender" | "Receiver"

export type UpdateProfileDTO = {
  id: string
  notificationToken?: string
  userType: UserType
}


export interface Profile {
  id: string,
  email: string,
  userName: string,
  name: string,
  createdAt:string,
  notificationToken?: string
  customerType: UserType
}

export type SendPushNotification = {
  pushToken: string;
  message: string;
  title: string
};


export type PushNotificationsToAll = {
  userType: UserType
  userId: string,
  message: string,
  title: string
}

