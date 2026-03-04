"use client";

import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`px-6 py-3 rounded-xl shadow-lg text-white ${
          type === "success"
            ? "bg-gradient-to-r from-green-500 to-emerald-600"
            : "bg-gradient-to-r from-red-500 to-pink-600"
        }`}
      >
        {message}
      </div>
    </div>
  );
}