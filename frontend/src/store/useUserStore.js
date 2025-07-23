import { toast } from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,
  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (!name || !email || !password || !confirmPassword) {
      set({ loading: false });
      return toast.error("All fields are required");
    }
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      set({ user: res.data, loading: false });
      toast.success("Registered Successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message || "An error occured , try again later"
      );
    }
  },
  login: async (email, password) => {
    set({ loading: true });
    if (!email || !password) {
      set({ loading: false });
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      set({ user: res.data, loading: false });
      toast.success("LoggedIn Successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(
        error.response?.data?.message ||
          "An error occured in login store , try again later"
      );
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
      
    }
  },
}));
