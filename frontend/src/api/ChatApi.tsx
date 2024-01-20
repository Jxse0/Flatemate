const API_URL = `${import.meta.env.VITE_API_URL}/chat`;

const ChatApi = {
  async fetchMessages(token: string) {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.error("Error fetching messages:", error);
      return [];
    }
  },

  async sendMessage(text: string, username: string, token: string) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text, username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to send message:", error);
      throw error;
    }
  },
};

export default ChatApi;
