// /store/useSurfboardStore.js
import { create } from "zustand";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../utils/firebase";

const useSurfboardStore = create((set, get) => ({
  surfboards: [],
  loading: false,

  filters: { category: "all" },

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),

  fetchSurfboards: async ({ limitTo } = {}) => {
    set({ loading: true });
    let surfboardsRef = collection(db, "surfboards");
    if (limitTo) {
      surfboardsRef = query(surfboardsRef, limit(limitTo));
    }

    const snapshot = await getDocs(surfboardsRef);
    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const { filters } = get();
    const filtered = all.filter(
      (board) =>
        filters.category === "all" || board.category === filters.category
    );

    set({ surfboards: filtered, loading: false });
  },

  fetchUserSurfboards: async (userId) => {
    set({ loading: true });
    const userRef = doc(db, "users", userId);
    const q = query(
      collection(db, "surfboards"),
      where("seller", "==", userRef)
    );
    const snapshot = await getDocs(q);
    const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const { filters } = get();
    const filtered = all.filter(
      (board) =>
        filters.category === "all" || board.category === filters.category
    );

    set({ surfboards: filtered, loading: false });
  },

  fetchSurfboardById: async (id) => {
    set({ loading: true });
    try {
      const surfboardDoc = await getDocs(
        query(collection(db, "surfboards"), where("__name__", "==", id))
      );
      const surfboard =
        surfboardDoc.docs.length > 0
          ? { id: surfboardDoc.docs[0].id, ...surfboardDoc.docs[0].data() }
          : null;
      set({ surfboards: surfboard ? [surfboard] : [], loading: false });
      return surfboard;
    } catch (error) {
      set({ loading: false });
      console.error("Error fetching surfboard by id:", error);
      return null;
    }
  },

  uploadSurfboard: async (data) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const sellerRef = doc(db, "users", user.uid);

      const uploadedImageURLs = await Promise.all(
        Array.from(data.images).map(async (file, index) => {
          const path = `surfboards/${user.uid}/${Date.now()}-${index}-${
            file.name
          }`;
          const fileRef = ref(storage, path);
          await uploadBytes(fileRef, file);
          return await getDownloadURL(fileRef);
        })
      );

      const surfboardData = {
        category: data.category,
        color: data.color,
        brand: data.brand,
        finSetup: data.finSetup,
        model: data.model,
        size: data.size,
        finSystem: data.finSystem,
        volume: data.volume,
        description: data.description,
        images: uploadedImageURLs,
        upload_date: serverTimestamp(),
        isPrivate: true,
        seller: sellerRef,
        condition: data.condition || "used",
        status: data.status || "available",
        location: data.location,
        price: Number(data.price),
        skillLevel: data.skillLevel,
        technology: data.technology,
      };

      await addDoc(collection(db, "surfboards"), surfboardData);
      return true;
    } catch (error) {
      console.error("Error uploading surfboard:", error);
      return false;
    }
  },
}));

export default useSurfboardStore;
