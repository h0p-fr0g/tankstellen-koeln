export default function UpButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white text-2xl hover:bg-blue-700 shadow transition"
    >
      <span className="relative -top-0.5">↑</span>
    </button>
  );
}