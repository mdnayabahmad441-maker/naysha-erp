"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteStudentButton({ id }) {
  const router = useRouter();
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    setLoading(false);
    setShowConfirm(false);

    router.refresh();
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="text-red-400 hover:text-red-500"
      >
        Delete
      </button>

      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="glass-card p-8 rounded-xl w-96">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Confirm Delete
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this student?
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded bg-white/10 hover:bg-white/20"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2 rounded bg-gradient-to-r from-red-500 to-pink-600"
              >
                {loading ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}