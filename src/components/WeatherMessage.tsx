import { motion } from 'framer-motion';
import { WeatherData } from '@/services/weatherService';

interface WeatherMessageProps {
  weatherType: WeatherData['weatherType'];
}

const WeatherMessage = ({ weatherType }: WeatherMessageProps) => {
  const getMessage = () => {
    switch (weatherType) {
      case 'sunny':
        return "It's Sunny ☀️";
      case 'rainy':
        return "It's Rainy 🌧️";
      case 'cloudy':
        return "It's Cloudy ☁️";
      case 'snowy':
        return "It's Snowy ❄️";
      default:
        return "It's Sunny ☀️";
    }
  };

  return (
    <motion.div 
      className="text-center mb-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 200 
      }}
      key={weatherType} // Re-animate when weather type changes
    >
      <motion.div 
        className="glass-card inline-block px-8 py-4 mx-auto"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <p className="text-2xl md:text-3xl font-bold text-white">
          {getMessage()}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WeatherMessage;