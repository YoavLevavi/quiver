import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { auth } from "../utils/firebase";

const useUserStore = create((set) => ({
  userData: null,
  loading: true,

  fetchUserData: async () => {
    // Get the current user from Firebase Auth
    const uid = auth.currentUser?.uid;

    // If no user is logged in, set loading to false and return
    if (!uid) {
      set({ loading: false });
      return;
    }

    //
    try {
      // Create a reference to the user document
      const docRef = doc(db, "users", uid);
      // Fetch the document snapshot
      const docSnap = await getDoc(docRef);

      // Check if the document exists
      if (docSnap.exists()) {
        set({ userData: docSnap.data(), loading: false });
        console.log("User data fetched successfully:", docSnap.data());
      } else {
        // Document does not exist
        console.log("No such user document!");
        set({ userData: null, loading: false });
      }
    } catch (err) {
      // Handle any errors that occurred during the fetch
      console.error("Error fetching user profile:", err);
      set({ userData: null, loading: false });
    }
  },
}));

export default useUserStore;
