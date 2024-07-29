import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";
import moment from "moment";
import { Message } from "@/store/slices/chat-slice";

const MessageContainer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedChatType, selectedChatData, selectedChatMessages } =
    useAppStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [scrollRef]);

  const renderMessages = () => {
    if (!selectedChatType || !selectedChatData) {
      return <div>No chat selected</div>;
    }

    console.log("Rendering messages:", selectedChatMessages);

    let lastDate: string | null = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  if (!selectedChatData) {
    console.log("selectedChatData is null or undefined");
    return <div>No chat data available</div>;
  }

  const renderDMMessages = (message: Message) => {
    console.log("Rendering DM message:", message);

    return (
      <div
        className={
          message.sender === selectedChatData?._id ? "text-right" : "text-left"
        }
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData?._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[2a2b33]/5 text-white/80 border-[#ffffff]/20"
            }
             border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
