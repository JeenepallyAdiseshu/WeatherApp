import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Sunrise } from 'lucide-react';
import WeatherApp from './WeatherApp';

interface WelcomePageProps {
  onEnter: () => void;
}

const WelcomePage = ({ onEnter }: WelcomePageProps) => {
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return { period: 'morning', icon: Sunrise, greeting: 'Good Morning' };
    if (hour >= 12 && hour < 18) return { period: 'afternoon', icon: Sun, greeting: 'Good Afternoon' };
    if (hour >= 18 && hour < 22) return { period: 'evening', icon: Sun, greeting: 'Good Evening' };
    return { period: 'night', icon: Moon, greeting: 'Good Night' };
  };

  const { period, icon: TimeIcon, greeting } = getTimeOfDay();

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />
      
      {/* Floating Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="text-center space-y-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Time of Day Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, type: "spring", stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="glass-card p-6 rounded-full">
              <TimeIcon className="w-16 h-16 text-white" />
            </div>
          </motion.div>

          {/* Greeting */}
        
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-2">
              {greeting}!
            </p>
            <h1 className="text-hero">
              Welcome to Weather App
            </h1>
          </motion.div>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Get real-time weather updates with beautiful backgrounds that change based on conditions. 
            Experience modern design with smooth animations.
          </motion.p>

          {/* Enter Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Button
              onClick={onEnter}
              size="lg"
              className="glass-card px-8 py-4 text-lg font-semibold text-white border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Button>
          </motion.div>

          {/* Time Display */}
          <motion.div
            className="glass-card inline-block px-6 py-3 mt-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <p className="text-white/80 text-sm font-medium">
              It's currently {period} • {new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// this is my WeatherApp

export default WelcomePage;