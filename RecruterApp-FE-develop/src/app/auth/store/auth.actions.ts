import { Action } from '@ngrx/store';

interface User {
  firstName: string;
  lastName: string;
  id: string;
  role: string;
}

interface Candidate {
  firstName: string;
  lastName: string;
  id: string;
  role: string;
  email: string;
}

export enum ActionTypes {
  SignIn = '[Auth] Sign in',
  FetchUser = '[Auth] Fetch user',
  FetchUserSuccess = '[Auth] Fetch user success',
  GetTokenFromGoogle = '[Auth] GetTokenFromGoogle',
  GetTokenFromGoogleSuccess = '[Auth] GetToken FromGoogle Success',
  GetTokenFromGoogleFail = '[Auth] GetToken FromGoogle Fail',
  LogOut = '[Auth] Log out',
  VerificationCodeRequest = '[Auth] Request Verification code',
  SendVerificationCode = '[Auth] Send Verification code',
  SetCandidate = '[Auth] Set Candidate',
  SetApplicationId = '[Auth] Set Application Id',
}

export class SignIn implements Action {
  readonly type = ActionTypes.SignIn;
  constructor(public payload: string) {}
}

export class GetTokenFromGoogle implements Action {
  readonly type = ActionTypes.GetTokenFromGoogle;
}

export class GetTokenFromGoogleSuccess implements Action {
  readonly type = ActionTypes.GetTokenFromGoogleSuccess;
  constructor(public payload: string) {}
}
export class GetTokenFromGoogleFail implements Action {
  readonly type = ActionTypes.GetTokenFromGoogleFail;
}
export class FetchUser implements Action {
  readonly type = ActionTypes.FetchUser;
}
export class FetchUserSuccess implements Action {
  readonly type = ActionTypes.FetchUserSuccess;
  constructor(public payload: User) {}
}

export class LogOut implements Action {
  readonly type = ActionTypes.LogOut;
}

export class VerificationCodeRequest implements Action {
  readonly type = ActionTypes.VerificationCodeRequest;

  constructor(public payload: string) {}
}

export class SendVerificationCode implements Action {
  readonly type = ActionTypes.SendVerificationCode;

  constructor(public payload: string) {}
}

export class SetCandidate implements Action {
  readonly type = ActionTypes.SetCandidate;

  constructor(public payload: Candidate) {}
}

export class SetApplicationId implements Action {
  readonly type = ActionTypes.SetApplicationId;

  constructor(public payload: string) {}
}

export type ActionsUnion =
  | GetTokenFromGoogle
  | GetTokenFromGoogleSuccess
  | SignIn
  | FetchUser
  | FetchUserSuccess
  | LogOut
  | GetTokenFromGoogleFail
  | VerificationCodeRequest
  | SendVerificationCode
  | SetCandidate
  | SetApplicationId;
