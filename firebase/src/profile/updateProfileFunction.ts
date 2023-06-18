import {CallableContext} from "firebase-functions/v1/https";
import * as yup from "yup";
import {onUpdateProfile} from "../database";
import {CloudFunctionResult, ServerError, UpdateProfileDTO} from "../shared/interfaces";

const dtoScheme = yup.object().shape({
  id: yup.string(),
  notificationToken: yup.string(),
  customerType: yup.string(),

});

export const updateProfileFunction =async (
  dto: UpdateProfileDTO,
  context: CallableContext,
) :CloudFunctionResult<FirebaseFirestore.WriteResult>=> {
  if (!context.auth) return {success: false, error: ServerError.UNAUTHENTICATED};

  try {
    await dtoScheme.validate(dto);
  } catch (e) {
    return {
      success: false,
      error: ServerError.INVALID_ARGUMENTS,
      errorMessage: (e as string[]).join("\n"),
    };
  }

  const result = await onUpdateProfile(dto);
  return {success: true, payload: result};
};
