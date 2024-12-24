import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, setMessages, messages } = useConversation();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) {
        console.log("Conversation Id not found");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `/api/chats/conversation/${selectedConversation.id}/messages`
        );
        const data = await response.json();

        console.log(data);
        setMessages(data || []);
      } catch (error) {
        console.log("Error in useGetMessages", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [selectedConversation, setMessages]);

  return { messages, loading };
};

export default useGetMessages;