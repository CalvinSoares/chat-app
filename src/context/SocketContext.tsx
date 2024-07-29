import { useAppStore } from "@/store";
import { Message } from "@/store/slices/chat-slice";
import { HOST } from "@/utils/constants";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const socket = useRef<Socket | null>(null);
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socket.current.on("connect", () => {
        console.log("Connected to the server");
      });

      const handleReceiveMessage = (message: Message) => {
        console.log("Received message:", message); // Adicione este log para depuração
        const { selectedChatData, selectedChatType, addMessage } =
          useAppStore.getState();
        if (!selectedChatData) {
          throw new Error("Error in data validation");
        }

        if (
          selectedChatType !== undefined &&
          ((typeof message.sender === "string" &&
            selectedChatData._id === message.sender) ||
            (typeof message.sender !== "string" &&
              selectedChatData._id === message.sender._id)) &&
          ((typeof message.recipient === "string" &&
            selectedChatData._id === message.recipient) ||
            (typeof message.recipient !== "string" &&
              selectedChatData._id === message.recipient._id))
        ) {
          addMessage(message);
          console.log(addMessage);
        }
      };

      socket.current.on("receiveMessage", handleReceiveMessage);

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
