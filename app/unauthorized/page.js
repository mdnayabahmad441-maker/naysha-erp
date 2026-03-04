export default function Unauthorized() {
  return (
    <div className="flex items-center justify-center h-screen text-white">
      
      <div className="bg-slate-800 p-10 rounded-lg text-center">
        
        <h1 className="text-3xl font-bold mb-4">
          Access Denied
        </h1>

        <p className="mb-6">
          You don't have permission to access this module.
        </p>

        <a
          href="/school/dashboard"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Go to Dashboard
        </a>

      </div>

    </div>
  );
}