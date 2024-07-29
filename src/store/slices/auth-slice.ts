import { StateCreator } from "zustand";

export interface UserInfo {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  profileSetup: boolean;
  color: number;
  email: string;
  image: string;
}

export interface AuthState {
  userInfo: UserInfo | undefined;
  setUserInfo: (userInfo: UserInfo | undefined) => void;
}

const LOCAL_STORAGE_KEY = "userInfo";

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "null"),
  setUserInfo: (userInfo) => {
    if (userInfo) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userInfo));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    set({ userInfo });
  },
});
