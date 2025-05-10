import { RegisterUserInput, UserInfo } from "../types/UserInfo";


export async function registerUser(user: RegisterUserInput): Promise<UserInfo> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/addNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }

  const savedUser: UserInfo = await response.json();
  return savedUser;
}