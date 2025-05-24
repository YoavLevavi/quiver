import { create } from "zustand";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const useSurfboardStore = create((set, get) => ({
  surfboards: [],
  loading: false,

  filters: {
    category: "all",
  },

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  /** Fetch surfboards from Firestore */
  fetchSurfboards: async ({ limitTo } = {}) => {
    set({ loading: true });

    let surfboardsRef = collection(db, "surfboards");
    if (limitTo) {
      surfboardsRef = query(surfboardsRef, limit(limitTo));
    }

    const snapshot = await getDocs(surfboardsRef);
    const all = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const { filters } = get();
    const filtered = all.filter((board) => {
      const matchCategory =
        filters.category === "all" || board.category === filters.category;
      return matchCategory;
    });

    set({ surfboards: filtered, loading: false });
  },

  /** Fetch surfboards for the user logged in */
  /** NEW: Fetch surfboards for a specific user (by seller/userId) */
  fetchUserSurfboards: async (userId) => {
    set({ loading: true });

    // Create a reference to the user document
    const userRef = doc(db, "users", userId);

    // Query surfboards where 'seller' == userRef
    const surfboardsRef = collection(db, "surfboards");
    const q = query(surfboardsRef, where("seller", "==", userRef));
    const snapshot = await getDocs(q);

    const all = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optional: filter by category, just like in fetchSurfboards
    const { filters } = get();
    const filtered = all.filter((board) => {
      const matchCategory =
        filters.category === "all" || board.category === filters.category;
      return matchCategory;
    });

    set({ surfboards: filtered, loading: false });
  },
}));

export default useSurfboardStore;
