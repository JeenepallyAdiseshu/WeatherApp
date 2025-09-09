
const LoadingSpinner = () => {
  return (
    <div className="glass-card animate-scale-in max-w-md mx-auto text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white/30 border-t-white mx-auto mb-4"></div>
      <div className="text-white/80">Loading weather data...</div>
    </div>
  );
};

export default LoadingSpinner;
