// src/store/useAuthStore.js
import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const useAuthStore = create((set) => ({
  //initial state
  user: null,
  loading: true,

  //actions
  initAuth: () => {
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null });
  },
}));

export default useAuthStore;
