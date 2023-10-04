export interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  storeId: string;
  roleId: string;
  isVerify: boolean;
}

export interface LoginForm {
  email: string;
  password: string;
}
