import * as I from "../../functions/src/shared/interfaces";
import { getFunctions, httpsCallable } from "firebase/functions";

const dtoResult = <DTO, Result>() => ({} as (dto: DTO) => CloudFunctionResult<Result>)

type CloudFunctionResult<T> = Promise<{
  data: { success: boolean; payload: T; error?: I.ServerError; errorMessage?: string }
}>

export const functions = {
  updateProfile : dtoResult<I.UpdateProfileDTO, FirebaseFirestore.WriteResult>(),
  sendNotification : dtoResult<I.PushNotificationsToAll, boolean>()
}


Object.keys(functions).forEach(key => (functions[key] = httpsCallable( getFunctions(), key)))
