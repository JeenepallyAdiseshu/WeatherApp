
import { useState, useEffect } from 'react';
import { WeatherData } from '@/services/weatherService';
import sunnyBg from '@/assets/sunny-bg.jpg';
import rainyBg from '@/assets/rainy-bg.jpg';
import cloudyBg from '@/assets/cloudy-bg.jpg';
import snowyBg from '@/assets/snowy-bg.jpg';

interface WeatherBackgroundProps {
  weatherType: WeatherData['weatherType'];
}

const WeatherBackground = ({ weatherType }: WeatherBackgroundProps) => {
  const [particles, setParticles] = useState<Array<{ id: number; style: React.CSSProperties }>>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      const particleCount = weatherType === 'rainy' ? 50 : weatherType === 'snowy' ? 30 : 0;
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: weatherType === 'rainy' ? `${0.5 + Math.random() * 0.5}s` : `${2 + Math.random() * 2}s`
          }
        });
      }
      
      setParticles(newParticles);
    };

    createParticles();
  }, [weatherType]);

  const getBackgroundImage = () => {
    switch (weatherType) {
      case 'sunny':
        return sunnyBg;
      case 'rainy':
        return rainyBg;
      case 'cloudy':
        return '/lovable-uploads/3e5fed02-43df-4652-8941-ab64ecf4a1c5.png';
      case 'snowy':
        return snowyBg;
      default:
        return sunnyBg;
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/10 to-black/30" />
      
      {/* Additional weather-specific overlays */}
      {weatherType === 'sunny' && (
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-orange-300/10" />
      )}
      
      {weatherType === 'rainy' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-600/10 to-slate-800/20" />
          {/* Subtle rain animation overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.slice(0, 20).map((particle, i) => (
              <div
                key={i}
                className="absolute w-px h-8 bg-white/20 animate-rain-fall"
                style={{
                  left: `${particle.style.left}`,
                  animationDelay: `${particle.style.animationDelay}`,
                  animationDuration: `${particle.style.animationDuration}`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {weatherType === 'cloudy' && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-400/10 via-transparent to-gray-600/15" />
      )}
      
      {weatherType === 'snowy' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/10 via-white/5 to-gray-300/15" />
          {/* Subtle snow animation overlay */}
          <div className="absolute inset-0 overflow-hidden">
            {particles.slice(0, 15).map((particle, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-snow-fall"
                style={{
                  left: `${particle.style.left}`,
                  animationDelay: `${particle.style.animationDelay}`,
                  animationDuration: `${particle.style.animationDuration}`
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherBackground;
