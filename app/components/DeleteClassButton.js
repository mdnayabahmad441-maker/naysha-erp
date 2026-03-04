"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Toast from "@/app/components/Toast";

export default function DeleteClassButton({ id, studentCount }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const handleDelete = async () => {
    if (studentCount > 0) {
      setToast("Cannot delete class with students ❌");
      return;
    }

    const confirmDelete = confirm("Delete this class?");
    if (!confirmDelete) return;

    await fetch(`/api/classes/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  };

  return (
    <>
      <button
        onClick={handleDelete}
        className="text-red-400 hover:underline"
      >
        Delete
      </button>

      {toast && (
        <Toast
          message={toast}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
}