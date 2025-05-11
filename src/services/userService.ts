import { LoginData } from "../dtos/loginData.dto";
import { RegisterUserInput, UserInfo } from "../types/UserInfo";


export async function registerUser(user: RegisterUserInput): Promise<UserInfo> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/addNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Registration failed: ${errorText}`);
  }

  const savedUser: UserInfo = await response.json();
  return savedUser;
}

export async function loginUser(loginData: LoginData): Promise<UserInfo> {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    mode: 'cors',
    body: JSON.stringify(loginData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Login failed: ${errorText}`);
  }

  const savedUser: UserInfo = await response.json();

  return savedUser
}

export async function logoutUser() {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_BASEURL}/auth/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            console.log("Logged out successfully!");
            return Promise.resolve("Logout successful");
        } else {
            return Promise.reject("Failed to log out");
        }
    } catch (error) {
        console.error("Error during logout:", error);
        return Promise.reject("Logout error");
    }
}