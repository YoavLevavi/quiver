/**
 * UploadSurfboardModal component renders a modal dialog for uploading a surfboard.
 * If the user is authenticated, it displays the upload form; otherwise, it prompts for Google login.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {Function} props.onClose - Callback to close the modal.
 * @returns {JSX.Element} The rendered modal dialog.
 */
import React from "react";
import useAuthStore from "../../store/useAuthStore";
import EditUserComp from "./EditUserComp";
import Title2 from "../Text/Title2";
import Title3 from "../Text/Title3";
import SubTitle1 from "../Text/SubTitle1";
import TextLarge from "../Text/TextLarge";

function EditUserModal({ open, onClose }) {
  const { user, loginWithGoogle } = useAuthStore();

  return (
    <dialog open={open} className="modal" onClose={onClose}>
      <div
        className="modal-box bg-base-200 max-w-2xl max-h-[90vh] my-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        style={{ direction: "rtl" }}
      >
      <button
          className="btn btn-sm btn-circle absolute left-2 top-2"
          onClick={onClose}
          aria-label="סגור"
        >
          ✕
        </button>
        <Title3>ברוכים הבאים לQuiver!</Title3>
        <TextLarge>
          הכניסו את הפרטים שלכם כדי לקבל את החוויה הטובה ביותר!
        </TextLarge>
        
        {user ? (
          <EditUserComp />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <h2 className="text-xl font-bold mb-4">התחברות נדרשת</h2>
            <p className="mb-6 text-center">
              כדי להעלות גלשן למכירה, עליך להתחבר לחשבון שלך.
            </p>
            <button
              className="btn btn-primary"
              onClick={loginWithGoogle}
              aria-label="התחבר עם גוגל"
            >
              התחבר עם גוגל
            </button>
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="סגור" onClick={onClose}>
          סגור
        </button>
      </form>
    </dialog>
  );
}

export default EditUserModal;
