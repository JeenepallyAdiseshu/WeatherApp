import { useState, useEffect } from 'react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

export interface TimeOfDay {
  period: 'morning' | 'afternoon' | 'evening' | 'night';
  icon: typeof Sun;
  greeting: string;
  time: string;
}

export const useTimeOfDay = (timezoneOffset?: number) => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(() => getTimeOfDay(timezoneOffset));

  function getTimeOfDay(timezoneOffset?: number): TimeOfDay {
    let now: Date;
    let timeString: string;
    
    if (timezoneOffset !== undefined) {
      // Convert timezone offset from seconds to milliseconds and create city time
      const utcTime = new Date();
      const cityTime = new Date(utcTime.getTime() + (timezoneOffset * 1000));
      now = cityTime;
      timeString = cityTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        timeZone: 'UTC'
      });
    } else {
      // Use user's local time
      now = new Date();
      timeString = now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    const hour = now.getHours();

    if (hour >= 5 && hour < 12) {
      return { 
        period: 'morning', 
        icon: Sunrise, 
        greeting: 'Good Morning',
        time: timeString
      };
    }
    if (hour >= 12 && hour < 17) {
      return { 
        period: 'afternoon', 
        icon: Sun, 
        greeting: 'Good Afternoon',
        time: timeString
      };
    }
    if (hour >= 17 && hour < 21) {
      return { 
        period: 'evening', 
        icon: Sunset, 
        greeting: 'Good Evening',
        time: timeString
      };
    }
    return { 
      period: 'night', 
      icon: Moon, 
      greeting: 'Good Night',
      time: timeString
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(getTimeOfDay(timezoneOffset));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [timezoneOffset]);

  return timeOfDay;
};