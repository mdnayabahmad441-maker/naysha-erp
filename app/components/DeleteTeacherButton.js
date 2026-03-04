"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Toast from "@/app/components/Toast";

export default function DeleteTeacherButton({ id }) {
  const router = useRouter();
  const [toast, setToast] = useState(null);

  const handleDelete = async () => {
    const confirmDelete = confirm("Delete this teacher?");
    if (!confirmDelete) return;

    await fetch(`/api/teachers/${id}`, {
      method: "DELETE",
    });

    setToast("Teacher deleted ✅");
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
        <Toast message={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}