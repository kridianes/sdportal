import { WeatherService, WeatherForecast, WeatherCondition } from './types';

export class MockWeatherService implements WeatherService {
  async getForecastByDates(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherForecast[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    
    // Generate random forecasts for each day
    const forecasts: WeatherForecast[] = [];
    
    for (let i = 0; i < daysDiff; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      
      forecasts.push(this.generateRandomForecast(date.toISOString(), location));
    }
    
    return forecasts;
  }
  
  async getCurrentWeather(location: string): Promise<WeatherForecast> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.generateRandomForecast(new Date().toISOString(), location);
  }
  
  getWeatherIconUrl(condition: WeatherCondition): string {
    // Return a placeholder icon URL based on the condition
    const iconMap: Record<WeatherCondition, string> = {
      'clear': 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
      'partly-cloudy': 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
      'cloudy': 'https://cdn.weatherapi.com/weather/64x64/day/119.png',
      'rain': 'https://cdn.weatherapi.com/weather/64x64/day/296.png',
      'thunderstorm': 'https://cdn.weatherapi.com/weather/64x64/day/389.png',
      'snow': 'https://cdn.weatherapi.com/weather/64x64/day/338.png',
      'fog': 'https://cdn.weatherapi.com/weather/64x64/day/248.png',
      'wind': 'https://cdn.weatherapi.com/weather/64x64/day/143.png',
    };
    
    return iconMap[condition];
  }
  
  // Helper method to generate a random forecast
  private generateRandomForecast(dateString: string, location: string): WeatherForecast {
    const date = new Date(dateString);
    const seed = date.getDate() + date.getMonth() * 100 + location.length;
    
    // Use the seed to generate deterministic "random" values
    const conditions: WeatherCondition[] = [
      'clear',
      'partly-cloudy',
      'cloudy',
      'rain',
      'thunderstorm',
      'snow',
      'fog',
      'wind',
    ];
    
    // Determine condition based on location and date
    let condition: WeatherCondition;
    
    // Simplified logic to make weather somewhat realistic based on location
    if (location.toLowerCase().includes('barcelona')) {
      // Barcelona tends to be sunny
      const randomValue = (seed % 10) / 10;
      condition = randomValue < 0.7 ? 'clear' : 
                 randomValue < 0.9 ? 'partly-cloudy' : 'rain';
    } else if (location.toLowerCase().includes('tokyo')) {
      // Tokyo has varied weather
      const randomValue = (seed % 10) / 10;
      condition = randomValue < 0.4 ? 'clear' : 
                 randomValue < 0.7 ? 'partly-cloudy' : 
                 randomValue < 0.9 ? 'rain' : 'cloudy';
    } else if (location.toLowerCase().includes('new york')) {
      // New York has varied weather
      const randomValue = (seed % 10) / 10;
      condition = randomValue < 0.3 ? 'clear' : 
                 randomValue < 0.6 ? 'partly-cloudy' : 
                 randomValue < 0.8 ? 'rain' : 
                 randomValue < 0.9 ? 'snow' : 'thunderstorm';
    } else {
      // Default random weather
      condition = conditions[seed % conditions.length];
    }
    
    // Generate temperature based on condition and location
    let baseTemp = 22; // Default base temperature in Celsius
    
    if (location.toLowerCase().includes('barcelona')) {
      baseTemp = 25;
    } else if (location.toLowerCase().includes('tokyo')) {
      baseTemp = 20;
    } else if (location.toLowerCase().includes('new york')) {
      baseTemp = 15;
    }
    
    // Adjust temperature based on condition
    let tempAdjustment = 0;
    switch (condition) {
      case 'clear':
        tempAdjustment = 5;
        break;
      case 'partly-cloudy':
        tempAdjustment = 2;
        break;
      case 'rain':
        tempAdjustment = -3;
        break;
      case 'thunderstorm':
        tempAdjustment = -5;
        break;
      case 'snow':
        tempAdjustment = -10;
        break;
    }
    
    const temperatureC = baseTemp + tempAdjustment + (seed % 5) - 2;
    const temperatureF = (temperatureC * 9) / 5 + 32;
    
    // Generate other weather data
    const precipitationChance = condition === 'clear' ? 0 : 
                               condition === 'partly-cloudy' ? 0.1 : 
                               condition === 'cloudy' ? 0.3 : 
                               condition === 'rain' ? 0.7 : 
                               condition === 'thunderstorm' ? 0.9 : 
                               condition === 'snow' ? 0.8 : 0.2;
    
    const humidity = 0.4 + (precipitationChance * 0.5);
    const windSpeed = 5 + (seed % 20);
    
    // Generate sunrise and sunset times
    const sunrise = `0${6 + (seed % 2)}:${30 + (seed % 30)}`;
    const sunset = `${18 + (seed % 3)}:${30 + (seed % 30)}`;
    
    return {
      date: dateString,
      condition,
      temperatureC,
      temperatureF,
      precipitationChance,
      humidity,
      windSpeed,
      sunrise,
      sunset,
      icon: this.getWeatherIconUrl(condition),
    };
  }
}

