import { StateCreator } from "zustand";
import { UserInfo } from "./auth-slice";

type RecipientSender = string | UserInfo;

export interface Message {
  id: string;
  recipient: RecipientSender;
  sender: RecipientSender;
  content: string;
  fileUrl: string;
  messageType: "text" | "file";
  timestamp: Date;
}

export interface ChatState {
  selectedChatType?: string;
  selectedChatData?: UserInfo;
  selectedChatMessages: Message[];
  setSelectedChatType: (selectedChatType: string) => void;
  setSelectedChatData: (selectedChatData: UserInfo) => void;
  setSelectedChatMessages: (selectedChatMessages: Message[]) => void;
  closeChat: () => void;
  addMessage: (message: Message) => void;
}

export const createChatSlice: StateCreator<ChatState> = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  setSelectedChatType: (selectedChatType: string) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData: UserInfo) =>
    set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages: Message[]) =>
    set({ selectedChatMessages }),
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message: Message) => {
    const { selectedChatMessages, selectedChatType } = get();

    console.log("Adding message:", message);

    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "channel"
              ? message.recipient
              : typeof message.recipient === "string"
                ? message.recipient
                : message.recipient._id,
          sender:
            selectedChatType === "channel"
              ? message.sender
              : typeof message.sender === "string"
                ? message.sender
                : message.sender._id,
        },
      ],
    });
  },
});
