// src/store/useAuthStore.js
import { create } from "zustand";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const useAuthStore = create((set) => ({
  //initial state
  user: null,
  loading: true,

  //actions
  initAuth: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check if user document exists in Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        // If user document doesn't exist, create it
        if (!userDocSnap.exists()) {
          console.log("Creating new user document for:", user.displayName);
          try {
            // Add email field to the user document during creation
            await setDoc(userDocRef, {
              uid: user.uid,
              email: user.email, 
              displayName: user.displayName,
              photoURL: user.photoURL,
              first_name: "",
              last_name: "",
              gender: "",
              location: "",
              phone_number: "",
              date_of_birth: "",
              created_at: serverTimestamp(),
              updated_at: serverTimestamp(),
            });
            console.log("✅ User document created successfully");
          } catch (error) {
            console.error("❌ Error creating user document:", error);
          }
        }
      }
      set({ user, loading: false });
    });
  },

  logout: async () => {
    await auth.signOut();
    set({ user: null });
  },

  getCurrentUserId: () => {
    const state = useAuthStore.getState();
    return state.user ? state.user.uid : null;
  },
}));

export default useAuthStore;
