export type RegisterUserInput = {
  name: string;
  email: string;
  password: string;
  roles: string;
};

export type UserInfo = {
  id: number;
  name: string;
  email: string;
}