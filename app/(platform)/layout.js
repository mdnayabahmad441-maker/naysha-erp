export default function PlatformLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-[#1e1b4b] text-white">
      {children}
    </div>
  );
}