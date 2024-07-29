import { create } from "zustand";
import { AuthState, createAuthSlice } from "./slices/auth-slice";
import { createChatSlice, ChatState } from "./slices/chat-slice";

export const useAppStore = create<AuthState & ChatState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));
