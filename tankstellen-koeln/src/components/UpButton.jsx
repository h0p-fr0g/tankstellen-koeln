import React from "react";

export default function UpButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition flex items-center justify-center w-12 h-12 text-2xl z-50"
    >
      <span className="relative -top-1">↑</span>
    </button>
  );
}
