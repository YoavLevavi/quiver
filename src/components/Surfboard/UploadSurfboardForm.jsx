import React, { useState } from "react";
import useSurfboardStore from "../../store/useSurfboardStore";
import InputField from "../UI/InputField";
import { X, Image, Plus } from "lucide-react"; // Lucide icons for better visuals
import { CATEGORIES } from "../../utils/surfboardHelpers";

const initialForm = {
  category: "",
  brand: "",
  model: "",
  color: "",
  size: "",

  volume: "",
  description: "",
  images: [],
  coverIndex: 0,
  finSetup: "",
  finSystem: "",
  location: "",
  price: "",
  skillLevel: "",
  technology: "",
  status: "available", // Default to available
};

function UploadSurfboardForm() {
  const [formData, setFormData] = useState(initialForm);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { uploadSurfboard } = useSurfboardStore();

  // Handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload and preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
      coverIndex: prev.images.length === 0 ? 0 : prev.coverIndex,
    }));
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
    e.target.value = ""; // allow re-select same files
  };

  // Set a specific image as cover
  const setCover = (index) => {
    setFormData((prev) => ({
      ...prev,
      coverIndex: index,
    }));
  };

  // Remove a specific image and adjust cover logic
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);

    let newCoverIndex = formData.coverIndex;
    if (index === formData.coverIndex) newCoverIndex = 0;
    else if (index < formData.coverIndex)
      newCoverIndex = formData.coverIndex - 1;

    setFormData((prev) => ({
      ...prev,
      images: newImages,
      coverIndex: newCoverIndex,
    }));
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setSuccess(false);

    // Place cover image first
    let imagesForUpload = [...formData.images];
    if (formData.coverIndex > 0) {
      const cover = imagesForUpload[formData.coverIndex];
      imagesForUpload.splice(formData.coverIndex, 1);
      imagesForUpload.unshift(cover);
    }
    const uploadData = { ...formData, images: imagesForUpload };

    const ok = await uploadSurfboard(uploadData);
    setUploading(false);
    setSuccess(ok);

    if (ok) {
      setFormData(initialForm);
      setPreviews([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 rounded-2xl">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-2xl font-bold mb-4">הוספת גלשן חדש</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              {success && (
                <div className="alert alert-success">הגלשן פורסם בהצלחה!</div>
              )}

              {/* Categories */}
              <div>
                <label className="block mb-1 ">קטגוריה</label>
                <select
                  name="category"
                  className="select select-bordered w-full"
                  required
                  value={formData.category ?? ""}
                  onChange={handleChange}
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand/Model/Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  name="brand"
                  label="מותג"
                  value={formData.brand ?? ""}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="model"
                  label="מודל"
                  value={formData.model ?? ""}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="color"
                  label="צבע"
                  value={formData.color ?? ""}
                  onChange={handleChange}
                />
              </div>

              {/* Length/Width/Volume */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  name="size"
                  label="אורך (ft)"
                  type="number"
                  value={formData.size ?? ""}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="volume"
                  label="נפח (L)"
                  type="number"
                  value={formData.volume ?? ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Fin Setup / Fin System */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField
                  name="finSetup"
                  label="סטאפ חרבות"
                  type="number"
                  value={formData.finSetup ?? ""}
                  onChange={handleChange}
                />
                <div>
                  <label className="block mb-1">סוג בית החרבות</label>
                  <select
                    name="finSystem"
                    className="select select-bordered w-full"
                    value={formData.finSystem ?? ""}
                    onChange={handleChange}
                  >
                    <option value="">בחר</option>
                    <option value="FCS II">FCS II</option>
                    <option value="Futures">Futures</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 ">טכנולוגיה</label>
                  <select
                    name="technology"
                    className="select select-bordered w-full"
                    value={formData.technology ?? ""}
                    onChange={handleChange}
                  >
                    <option value="">בחר</option>
                    <option value="PU">PU</option>
                    <option value="Epoxy">אפוקסי</option>
                    <option value="Soft">סופט</option>
                  </select>
                </div>
              </div>

              {/* Location / Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  name="location"
                  label="מיקום"
                  value={formData.location ?? ""}
                  onChange={handleChange}
                  required
                />
                <InputField
                  name="price"
                  label="מחיר (₪)"
                  type="number"
                  value={formData.price ?? ""}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Status */}
              <div>
                <select
                  name="status"
                  className="select select-bordered w-full"
                  value={formData.status ?? ""}
                  onChange={handleChange}
                >
                  <option value="available">זמין</option>
                  <option value="sold">נמכר</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block mb-1">תיאור</label>
                <textarea
                  name="description"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  value={formData.description ?? ""}
                  onChange={handleChange}
                  placeholder="תאר את מצב הגלשן, פגמים, שיפוצים, היסטוריה..."
                ></textarea>
              </div>

              {/* Images */}
              <div>
                <label className="block mb-2 font-medium">תמונות</label>
                <div className="flex flex-wrap gap-4 mb-3">
                  {previews.map((url, index) => (
                    <div
                      key={index}
                      className={`relative w-24 h-24 border rounded-lg overflow-hidden group ${
                        index === formData.coverIndex
                          ? "ring-2 ring-blue-400"
                          : ""
                      }`}
                    >
                      <img
                        src={url}
                        alt={`גלשן ${index + 1}`}
                        className="w-full h-full object-cover"
                        onClick={() => setCover(index)}
                        style={{ cursor: "pointer" }}
                        title="תמונה ראשית"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity">
                        <button
                          type="button"
                          className="text-white mb-1 p-1"
                          onClick={() => setCover(index)}
                          title="תמונה ראשית"
                        >
                          <Image className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="text-white p-1 hover:text-red-500"
                          onClick={() => removeImage(index)}
                          title="הסר תמונה"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      {index === formData.coverIndex && (
                        <div className="absolute bottom-0 inset-x-0 bg-blue-500/90 text-white text-xs text-center py-0.5">
                          תמונה ראשית
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add image button */}
                  <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-400 transition">
                    <input
                      type="file"
                      name="images"
                      accept="image/*"
                      onChange={handleImageChange}
                      multiple
                      className="hidden"
                    />
                    <Plus className="w-8 h-8 text-gray-400" />
                  </label>
                </div>
                <div className="text-xs text-gray-500">
                  העלה תמונות ברורות מזוויות שונות. לחץ על תמונה כדי להפוך אותה
                  לתמונה ראשית.
                </div>
              </div>

              {/* Submit buttons */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={uploading}
                >
                  {uploading ? "מעלה..." : "פרסם"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadSurfboardForm;
