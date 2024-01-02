const API_URL = "http://localhost:3001/chat";
const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIzMDc3MTNkOC05NThjLTRkNWYtYjMzMS0zY2RkZjIyNWE5ODQiLCJ3Z2lkIjoiNTNmODJmYWQtODg5My00OThmLTk5ZDEtNWEwZWE0NjJlMjJjIiwiaWF0IjoxNzA0MTUyMzAyLCJleHAiOjE3MDQxNjMxMDJ9.oTDCoiYSOe_TvBvk-Wa70AtqZS_DT03hu7RKyiuFkmw"; // Replace with your actual token

const ChatApi = {
  async fetchMessages() {
    try {
      const response = await fetch(API_URL, {
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
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

  async sendMessage(message: string) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: TOKEN,
        },
        body: JSON.stringify({ message }),
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
