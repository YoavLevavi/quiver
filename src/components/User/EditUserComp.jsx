import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "../../utils/firebase";
import LoadingIndicator from "../UI/LoadingIndicator";
import InputField from "../UI/InputField";
import Alert from "../UI/Alert";
import DOMPurify from "dompurify";

/**
 * EditUserComp is a React functional component that provides a user profile editing editUserForm.
 *
 * This component fetches the current user's profile data from Firestore on mount,
 * populates the editUserForm fields, and allows the user to update their personal information.
 * It also handles the retrieval of the user's profile photo from Firebase Storage if necessary.
 *
 * Features:
 * - Fetches and displays user data (first name, last name, gender, location, phone number, date of birth, photo).
 * - Allows editing and updating of user profile fields.
 * - Handles loading state while fetching user data.
 * - Displays user profile photo if available.
 * - Submits updated data to Firestore and provides user feedback on success.
 *
 * Dependencies:
 * - React (useState, useEffect)
 * - Firebase Firestore (doc, getDoc, updateDoc)
 * - Firebase Storage (ref, getDownloadURL)
 * - Assumes `auth`, `db`, and `storage` are initialized and available in scope.
 *
 * @component
 * @returns {JSX.Element} The user profile editing editUserForm UI.
 */
function EditUserComp() {
  // Get the current user's UID from Firebase Auth
  const userId = auth.currentUser?.uid;

  // Local state for editUserForm fields
  const [editUserForm, setForm] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    location: "",
    phone_number: "",
    date_of_birth: "",
    photo_url: "",
  });

  // Loading state for async operations
  const [loading, setLoading] = useState(true);

  // State for showing success/error messages
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Fetch user data from Firestore on component mount or when userId changes
  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      // Reference to the user document in Firestore
      const userRef = doc(db, "users", userId);
      // Fetch the user document
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const data = userSnap.data();
        let photoUrl = data.photo_url;

        // If photo_url is a storage path, get the download URL
        if (photoUrl && !photoUrl.startsWith("https")) {
          try {
            photoUrl = await getDownloadURL(ref(storage, photoUrl));
          } catch (err) {
            // Log error if unable to get download URL
            console.error("Error getting photo URL:", err);
            photoUrl = "";
          }
        }

        // Populate editUserForm state with user data
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          gender: data.gender || "",
          location: data.location || "",
          phone_number: data.phone_number || "",
          date_of_birth: data.date_of_birth || "",
          photo_url: photoUrl || "",
        });
      }
      // Set loading to false after fetch
      setLoading(false);
    }

    fetchUser();
  }, [userId]);

  // Updated handleChange to sanitize inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    setForm((prev) => ({ ...prev, [name]: sanitizedValue }));
  };

  // Handle editUserForm submission to update user data in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return;

    // Validate required fields
    if (
      !editUserForm.first_name ||
      !editUserForm.last_name ||
      !editUserForm.phone_number
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      // Reference to the user document
      const userRef = doc(db, "users", userId);
      // Update user document with new editUserForm values
      await updateDoc(userRef, {
        first_name: editUserForm.first_name,
        last_name: editUserForm.last_name,
        gender: editUserForm.gender,
        location: editUserForm.location,
        phone_number: editUserForm.phone_number,
        date_of_birth: editUserForm.date_of_birth,
      });

      // Show success alert
      setSuccess(true);
      setError(false);
    } catch (err) {
      // Show error alert
      setSuccess(false);
      setError(true);
      console.error("Error updating user data:", err);
    }
  };

  // Show loading indicator while fetching user data
  if (loading) return <LoadingIndicator />;

  // Render the user profile editing editUserForm
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto p-6 rounded-2xl space-y-4 bg-base-200"
    >
      {success && <Alert type="success">עדכון הפרטים הושלם בהצלחה!</Alert>}
      {error && <Alert type="error">שגיאה! עדכון הפרטים נכשל.</Alert>}

      {editUserForm.photo_url && (
        <div className="flex justify-center">
          <img
            src={editUserForm.photo_url}
            alt="User"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
      )}

      <InputField
        label="שם פרטי:"
        name="first_name"
        value={editUserForm.first_name}
        onChange={handleChange}
      />
      <InputField
        label="שם משפחה:"
        name="last_name"
        value={editUserForm.last_name}
        onChange={handleChange}
      />

      <div>
        <label className="block mb-1">מין:</label>
        <select
          name="gender"
          value={editUserForm.gender}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="">בחר מין</option>
          <option value="זכר">זכר</option>
          <option value="נקבה">נקבה</option>
        </select>
      </div>

      <InputField
        label="מיקום:"
        name="location"
        value={editUserForm.location}
        onChange={handleChange}
      />
      <InputField
        label="מספר טלפון:"
        name="phone_number"
        value={editUserForm.phone_number}
        onChange={handleChange}
      />
      <InputField
        label="תאריך לידה:"
        name="date_of_birth"
        value={editUserForm.date_of_birth}
        onChange={handleChange}
        type="date"
      />

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          עדכן פרטים
        </button>
      </div>
    </form>
  );
}

export default EditUserComp;
