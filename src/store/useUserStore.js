import { create } from "zustand";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const useUserStore = create((set) => ({
  userData: null,
  loading: true,

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
      await updateDoc(userRef, updates);
      console.log("User data updated:", updates);

      // Refresh local userData after update
      const { fetchUserData } = useUserStore.getState();
      await fetchUserData();
    } catch (err) {
      console.error("Error updating user data:", err);
    }
  },
}));

export default useUserStore;
