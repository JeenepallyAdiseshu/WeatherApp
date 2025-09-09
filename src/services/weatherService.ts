
export interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  city: string;
  country: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  weatherType: 'sunny' | 'rainy' | 'cloudy' | 'snowy';
  timezone: number;
}

export interface ForecastDay {
  date: string;
  minTemp: number;
  maxTemp: number;
  condition: string;
  description: string;
  icon: string;
  weatherType: 'sunny' | 'rainy' | 'cloudy' | 'snowy';
}

export interface WeatherForecast {
  city: string;
  country: string;
  forecast: ForecastDay[];
}

export interface WeatherResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
  sys: {
    country: string;
  };
  timezone: number;
}

export interface ForecastResponse {
  city: {
    name: string;
    country: string;
  };
  list: Array<{
    dt: number;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

const getWeatherType = (condition: string, icon: string): WeatherData['weatherType'] => {
  const conditionLower = condition.toLowerCase();
  const iconCode = icon.substring(0, 2);
  
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle') || conditionLower.includes('thunderstorm') || iconCode === '09' || iconCode === '10' || iconCode === '11') {
    return 'rainy';
  }
  if (conditionLower.includes('snow') || iconCode === '13') {
    return 'snowy';
  }
  if (conditionLower.includes('cloud') || iconCode === '02' || iconCode === '03' || iconCode === '04') {
    return 'cloudy';
  }
  return 'sunny';
};

export class WeatherService {
  private apiKey: string;
  private baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather data not found for ${city}`);
      }

      const data: WeatherResponse = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
        weatherType: getWeatherType(data.weather[0].main, data.weather[0].icon),
        timezone: data.timezone
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getWeatherByCoordinates(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.baseUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Weather data not found for current location');
      }

      const data: WeatherResponse = await response.json();
      
      return {
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
        description: data.weather[0].description,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6),
        feelsLike: Math.round(data.main.feels_like),
        icon: data.weather[0].icon,
        weatherType: getWeatherType(data.weather[0].main, data.weather[0].icon),
        timezone: data.timezone
      };
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }

  async getForecastByCity(city: string): Promise<WeatherForecast> {
    try {
      const response = await fetch(
        `${this.forecastUrl}?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=metric&cnt=40`
      );

      if (!response.ok) {
        throw new Error(`Forecast data not found for ${city}`);
      }

      const data: ForecastResponse = await response.json();
      
      // Group by date and get daily min/max
      const dailyData = new Map<string, {
        date: string;
        minTemp: number;
        maxTemp: number;
        conditions: Array<{ main: string; description: string; icon: string; }>;
      }>();

      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData.has(date)) {
          dailyData.set(date, {
            date,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            conditions: []
          });
        }
        
        const dayData = dailyData.get(date)!;
        dayData.minTemp = Math.min(dayData.minTemp, item.main.temp_min);
        dayData.maxTemp = Math.max(dayData.maxTemp, item.main.temp_max);
        dayData.conditions.push(item.weather[0]);
      });

      const forecast = Array.from(dailyData.values())
        .slice(0, 6)
        .map(day => {
          // Use the most common condition for the day (simplified)
          const mainCondition = day.conditions[Math.floor(day.conditions.length / 2)];
          return {
            date: day.date,
            minTemp: Math.round(day.minTemp),
            maxTemp: Math.round(day.maxTemp),
            condition: mainCondition.main,
            description: mainCondition.description,
            icon: mainCondition.icon,
            weatherType: getWeatherType(mainCondition.main, mainCondition.icon)
          };
        });

      return {
        city: data.city.name,
        country: data.city.country,
        forecast
      };
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  }

  async getForecastByCoordinates(lat: number, lon: number): Promise<WeatherForecast> {
    try {
      const response = await fetch(
        `${this.forecastUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&cnt=40`
      );

      if (!response.ok) {
        throw new Error('Forecast data not found for current location');
      }

      const data: ForecastResponse = await response.json();
      
      // Group by date and get daily min/max (same logic as above)
      const dailyData = new Map<string, {
        date: string;
        minTemp: number;
        maxTemp: number;
        conditions: Array<{ main: string; description: string; icon: string; }>;
      }>();

      data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!dailyData.has(date)) {
          dailyData.set(date, {
            date,
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            conditions: []
          });
        }
        
        const dayData = dailyData.get(date)!;
        dayData.minTemp = Math.min(dayData.minTemp, item.main.temp_min);
        dayData.maxTemp = Math.max(dayData.maxTemp, item.main.temp_max);
        dayData.conditions.push(item.weather[0]);
      });

      const forecast = Array.from(dailyData.values())
        .slice(0, 6)
        .map(day => {
          const mainCondition = day.conditions[Math.floor(day.conditions.length / 2)];
          return {
            date: day.date,
            minTemp: Math.round(day.minTemp),
            maxTemp: Math.round(day.maxTemp),
            condition: mainCondition.main,
            description: mainCondition.description,
            icon: mainCondition.icon,
            weatherType: getWeatherType(mainCondition.main, mainCondition.icon)
          };
        });

      return {
        city: data.city.name,
        country: data.city.country,
        forecast
      };
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      throw error;
    }
  }
}
