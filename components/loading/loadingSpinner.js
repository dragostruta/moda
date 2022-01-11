const LoadingSpinner = () => {
  return (
    <div className="bg-black bg-opacity-50 absolute inset-0 z-50 flex justify-center items-center">
      <div className="w-16 h-16 border-t-transparent border-4 border-teal-400 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
