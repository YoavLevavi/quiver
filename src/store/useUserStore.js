import { create } from "zustand";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const useUserStore = create((set) => ({
  userData: null,
  loading: true,

  // Create new user document
  createUserDocument: async (user) => {
    if (!user?.uid) return false;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
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
      return true;
    } catch (error) {
      console.error("❌ Error creating user document:", error);
      return false;
    }
  },

  // Fetch user data from Firestore
  fetchUserData: async () => {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      set({ loading: false });
      return;
    }

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ userData: docSnap.data(), loading: false });
        console.log("User data fetched successfully:", docSnap.data());
      } else {
        console.log("No such user document!");
        set({ userData: null, loading: false });
      }
    } catch (err) {
      console.error("Error fetching user profile:", err);
      set({ userData: null, loading: false });
    }
  },

  // Update user data in Firestore
  updateUserData: async (updates) => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      const userRef = doc(db, "users", uid);
      await updateDoc(userRef, {
        ...updates,
        updated_at: serverTimestamp(),
      });
      console.log("User data updated:", updates);

      // Refresh local userData after update
      const { fetchUserData } = useUserStore.getState();
      await fetchUserData();
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  },

  // Get current user ID
  getCurrentUserId: () => {
    const state = useUserStore.getState();
    return state.userData ? state.userData.uid : null;
  },
}));

export default useUserStore;
