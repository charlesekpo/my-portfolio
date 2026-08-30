export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin";
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}