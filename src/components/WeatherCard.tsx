
import { WeatherData } from '@/services/weatherService';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard = ({ weather }: WeatherCardProps) => {
  return (
    <div className="glass-card animate-scale-in max-w-lg mx-auto">
      {/* Main Weather Display */}
      <div className="text-center mb-10">
        <div className="text-location mb-4">
          {weather.city}, {weather.country}
        </div>
        <div className="text-temp mb-6">
          {weather.temperature}°
        </div>
        <div className="text-condition mb-3 capitalize">
          {weather.description}
        </div>
        <div className="text-white/80 text-base font-medium mb-4">
          Feels like {weather.feelsLike}°
        </div>
        
        {/* Current Date and Time */}
        <div className="glass-subtle rounded-2xl px-4 py-2 inline-block">
          <div className="text-white/70 text-sm">
            {(() => {
              if (weather.timezone !== undefined) {
                // Show city's local date
                const utcTime = new Date();
                const cityTime = new Date(utcTime.getTime() + (weather.timezone * 1000));
                return cityTime.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  timeZone: 'UTC'
                });
              }
              return new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
            })()}
          </div>
        </div>
      </div>

      {/* Weather Details */}
      <div className="grid grid-cols-3 gap-5 text-center">
        <div className="glass-subtle rounded-2xl p-5 hover:scale-105 transition-transform duration-300">
          <Droplets className="w-7 h-7 text-white/90 mx-auto mb-3" />
          <div className="text-detail text-sm mb-2">Humidity</div>
          <div className="text-detail-value">{weather.humidity}%</div>
        </div>
        
        <div className="glass-subtle rounded-2xl p-5 hover:scale-105 transition-transform duration-300">
          <Wind className="w-7 h-7 text-white/90 mx-auto mb-3" />
          <div className="text-detail text-sm mb-2">Wind</div>
          <div className="text-detail-value">{weather.windSpeed} km/h</div>
        </div>
        
        <div className="glass-subtle rounded-2xl p-5 hover:scale-105 transition-transform duration-300">
          <Thermometer className="w-7 h-7 text-white/90 mx-auto mb-3" />
          <div className="text-detail text-sm mb-2">Condition</div>
          <div className="text-detail-value capitalize">
            {weather.condition}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
