export interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  storeId: string;
  roleId: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
