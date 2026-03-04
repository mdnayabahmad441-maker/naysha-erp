export default function Card({ children, className = "" }) {
  return (
    <div className={`glass-card p-6 ${className}`}>
      {children}
    </div>
  );
}