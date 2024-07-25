import { StateCreator } from "zustand";

export interface UserInfo {
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
  setUserInfo: (userInfo: UserInfo) => void;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo: userInfo }),
});
