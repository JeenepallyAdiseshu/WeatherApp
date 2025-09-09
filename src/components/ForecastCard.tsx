import { motion } from 'framer-motion';
import { ForecastDay } from '@/services/weatherService';

interface ForecastCardProps {
  forecast: ForecastDay[];
}

const ForecastCard = ({ forecast }: ForecastCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div 
      className="glass-card max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <h3 className="text-2xl font-bold text-white mb-8 text-center">
        6-Day Forecast
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {forecast.map((day, index) => (
          <motion.div
            key={day.date}
            className="glass-subtle rounded-2xl p-5 text-center hover:scale-105 transition-all duration-300 hover:bg-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="text-detail font-bold mb-3 text-base">
              {formatDate(day.date)}
            </div>
            
            <div className="text-5xl mb-4">
              {day.weatherType === 'sunny' && '☀️'}
              {day.weatherType === 'rainy' && '🌧️'}
              {day.weatherType === 'cloudy' && '☁️'}
              {day.weatherType === 'snowy' && '❄️'}
            </div>
            
            <div className="text-detail-value text-xl mb-2">
              {day.maxTemp}° / {day.minTemp}°
            </div>
            
            <div className="text-detail text-sm capitalize">
              {day.description}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ForecastCard;