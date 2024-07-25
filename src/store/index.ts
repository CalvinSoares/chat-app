import { create } from "zustand";
import { AuthState, createAuthSlice } from "./slices/auth-slice";

export const useAppStore = create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
}));
