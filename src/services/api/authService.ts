import axiosInstance from "@/lib/axios";
import { API_ENDPOINTS } from "./endpoints";
import { Token } from "./types";
import { AxiosResponse } from "axios";

export const authService = {
  register: async (data: { username: string, password: string }) => {
    try {
      const response: AxiosResponse<Token> = await axiosInstance.post(
        API_ENDPOINTS.REGISTER.BASE,
        data
      );
      return { data: response.data, error: null };
    } catch (error) {
      console.error("Error fetching data:", error);
      return { data: null, error };
    }
  },
};
