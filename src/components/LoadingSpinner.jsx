const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-8 h-8 border-2 border-neutral-800 border-t-emerald-500 rounded-full animate-spin" />
        <p className="mt-4 text-neutral-500 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
