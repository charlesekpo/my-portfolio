export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
}