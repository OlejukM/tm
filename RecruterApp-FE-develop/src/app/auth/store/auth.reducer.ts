import * as Auth from './auth.actions';
import { User } from '../user';

export const initialState: User = {
  user: {
    firstName: undefined,
    lastName: undefined,
    id: undefined,
    role: undefined,
    email: undefined,
  },
  hasAccessToken: false,
  isLoggedIn: false,
  token: undefined,
  applicationId: '',
};

export function authReducer(state = initialState, action: Auth.ActionsUnion) {
  switch (action.type) {
    case Auth.ActionTypes.SignIn: {
      return {
        ...state,
        token: action.payload,
        hasAccessToken: true,
      };
    }

    case Auth.ActionTypes.GetTokenFromGoogleSuccess: {
      return {
        ...state,
        token: action.payload,
        hasAccessToken: true,
      };
    }

    case Auth.ActionTypes.GetTokenFromGoogleFail: {
      return {
        ...state,
        token: undefined,
        hasAccessToken: false,
      };
    }

    case Auth.ActionTypes.FetchUserSuccess: {
      return {
        ...state,
        user: action.payload,
        token: state.token,
        hasAccessToken: state.hasAccessToken,
        isLoggedIn: true,
      };
    }
    case Auth.ActionTypes.LogOut: {
      return {
        ...state,
        user: undefined,
        token: undefined,
        hasAccessToken: false,
        isLoggedIn: false,
      };
    }
    case Auth.ActionTypes.SetApplicationId: {
      return {
        ...state,
        applicationId: action.payload,
      };
    }
    case Auth.ActionTypes.SetCandidate: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
