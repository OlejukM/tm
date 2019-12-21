export interface User {
  user?: {
    firstName: string;
    lastName: string;
    id?: string;
    role: string;
    email?: string;
  };
  token: string;
  hasAccessToken: boolean;
  isLoggedIn: boolean;
  applicationId: string;
}
