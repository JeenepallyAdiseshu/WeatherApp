
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherService, WeatherData, WeatherForecast } from '@/services/weatherService';
import WeatherBackground from './WeatherBackground';
import WeatherCard from './WeatherCard';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';
import ForecastCard from './ForecastCard';
import WeatherMessage from './WeatherMessage';
import WelcomePage from './WelcomePage';
import Footer from './Footer';
import { useTimeOfDay } from '@/hooks/useTimeOfDay';
import { toast } from 'sonner';

const WeatherApp = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherForecast | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const timeOfDay = useTimeOfDay(weather?.timezone);
  
  // Use the provided API key directly
  const apiKey = 'bce97eb20750dd14b2b5f6c365416ad5';
  const weatherService = new WeatherService(apiKey);

  useEffect(() => {
    // Only load default weather if not showing welcome
    if (!showWelcome) {
      fetchWeatherByCity('London');
    }
  }, [showWelcome]);

  const fetchWeatherAndForecast = async (city: string) => {
    setIsLoading(true);
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getWeatherByCity(city),
        weatherService.getForecastByCity(city)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
      toast.success(`Weather updated for ${weatherData.city}`);
    } catch (error) {
      toast.error('City not found. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = (city: string) => {
    fetchWeatherAndForecast(city);
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const [weatherData, forecastData] = await Promise.all([
            weatherService.getWeatherByCoordinates(latitude, longitude),
            weatherService.getForecastByCoordinates(latitude, longitude)
          ]);
          setWeather(weatherData);
          setForecast(forecastData);
          toast.success(`Weather updated for your location`);
        } catch (error) {
          toast.error('Unable to fetch weather for your location');
          console.error('Error:', error);
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        toast.error('Unable to retrieve your location');
        setIsLoading(false);
      }
    );
  };


  if (showWelcome) {
    return <WelcomePage onEnter={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <WeatherBackground weatherType={weather?.weatherType || 'sunny'} />
      
      <motion.div 
        className="relative z-10 p-4 pt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header with time of day */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-hero">Weather App</h1>
            
            {/* Time and greeting display */}
            <motion.div
              className="glass-card inline-block px-6 py-3"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 text-white">
                <timeOfDay.icon className="w-5 h-5" />
                <span className="font-medium">{timeOfDay.greeting}</span>
                <span className="text-white/80">•</span>
                <span className="text-white/80">{timeOfDay.time}</span>
              </div>
            </motion.div>
          </motion.div>
          
          <SearchBar
            onSearch={fetchWeatherByCity}
            onLocationRequest={fetchWeatherByLocation}
            isLoading={isLoading}
          />
          
          <AnimatePresence mode="wait">
            {isLoading && <LoadingSpinner />}
            
            {weather && !isLoading && (
      <motion.div
        key="weather-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-10"
      >
        <WeatherMessage weatherType={weather.weatherType} />
        
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 items-start max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <WeatherCard weather={weather} />
          </motion.div>
          {forecast && (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <ForecastCard forecast={forecast.forecast} />
            </motion.div>
          )}
        </div>
      </motion.div>
            )}
            
            {!weather && !isLoading && (
              <motion.div 
                className="glass-card max-w-md mx-auto text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/80">
                  Search for a city or use your current location to get started
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Footer />
        </div>
      </motion.div>
    </div>
  );
};

export default WeatherApp;
