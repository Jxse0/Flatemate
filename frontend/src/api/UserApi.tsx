const API_URL_USER = `${import.meta.env.VITE_API_URL}/user`;
const API_URL_WG = `${import.meta.env.VITE_API_URL}/wg`;

const UserApi = {
  async getUser(token: string) {
    try {
      const response = await fetch(API_URL_USER, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching User:", error);
      return [];
    }
  },
  async getAllUser(token: string) {
    try {
      const response = await fetch(API_URL_WG, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.Users || [];
    } catch (error) {
      console.error("Error fetching User:", error);
      return [];
    }
  },
};
export default UserApi;
