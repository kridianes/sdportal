import { WeatherCondition, WeatherForecast, WeatherService } from './weather.interface';

/**
 * Mock implementation of the WeatherService
 */
export class MockWeatherService implements WeatherService {
  /**
   * Get weather forecast for a location by dates
   */
  async getForecastByDates(
    location: string,
    startDate: Date,
    endDate: Date
  ): Promise<WeatherForecast[]> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const forecasts: WeatherForecast[] = [];
    const currentDate = new Date(startDate);
    
    // Generate forecasts for each day in the range
    while (currentDate <= endDate) {
      forecasts.push(this.generateForecast(location, new Date(currentDate)));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return forecasts;
  }
  
  /**
   * Get current weather for a location
   */
  async getCurrentWeather(location: string): Promise<WeatherForecast> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return this.generateForecast(location, new Date());
  }
  
  /**
   * Generate a random weather forecast for a location and date
   */
  private generateForecast(location: string, date: Date): WeatherForecast {
    // Use location and date to seed the random generator for consistent results
    const seed = location.length + date.getDate() + date.getMonth();
    
    // Get a random condition based on the seed
    const conditions = Object.values(WeatherCondition);
    const condition = conditions[seed % conditions.length];
    
    // Generate temperature based on condition
    let baseTemp = 20; // Default base temperature in Celsius
    
    // Adjust base temperature based on location (very simplified)
    if (location.toLowerCase().includes('tokyo')) {
      baseTemp = 25;
    } else if (location.toLowerCase().includes('paris')) {
      baseTemp = 18;
    } else if (location.toLowerCase().includes('new york')) {
      baseTemp = 15;
    }
    
    // Adjust temperature based on condition
    let tempAdjustment = 0;
    switch (condition) {
      case WeatherCondition.SUNNY:
        tempAdjustment = 5;
        break;
      case WeatherCondition.PARTLY_CLOUDY:
        tempAdjustment = 2;
        break;
      case WeatherCondition.RAIN:
      case WeatherCondition.THUNDERSTORM:
        tempAdjustment = -3;
        break;
      case WeatherCondition.SNOW:
        tempAdjustment = -10;
        break;
    }
    
    const currentTemp = baseTemp + tempAdjustment;
    
    // Generate humidity based on condition
    let humidity = 50; // Default humidity
    switch (condition) {
      case WeatherCondition.SUNNY:
        humidity = 30 + (seed % 20);
        break;
      case WeatherCondition.PARTLY_CLOUDY:
        humidity = 40 + (seed % 20);
        break;
      case WeatherCondition.CLOUDY:
        humidity = 60 + (seed % 20);
        break;
      case WeatherCondition.RAIN:
      case WeatherCondition.THUNDERSTORM:
        humidity = 80 + (seed % 15);
        break;
      case WeatherCondition.SNOW:
        humidity = 70 + (seed % 20);
        break;
      case WeatherCondition.FOG:
        humidity = 90 + (seed % 10);
        break;
    }
    
    // Generate wind speed based on condition
    let windSpeed = 10; // Default wind speed in km/h
    switch (condition) {
      case WeatherCondition.THUNDERSTORM:
        windSpeed = 30 + (seed % 20);
        break;
      case WeatherCondition.SNOW:
      case WeatherCondition.RAIN:
        windSpeed = 20 + (seed % 15);
        break;
      default:
        windSpeed = 5 + (seed % 15);
    }
    
    // Generate precipitation based on condition
    let precipitation = 0; // Default precipitation in mm
    switch (condition) {
      case WeatherCondition.RAIN:
        precipitation = 5 + (seed % 10);
        break;
      case WeatherCondition.THUNDERSTORM:
        precipitation = 15 + (seed % 20);
        break;
      case WeatherCondition.SNOW:
        precipitation = 10 + (seed % 15);
        break;
    }
    
    return {
      date: date.toISOString().split('T')[0],
      temperature: {
        min: currentTemp - 5,
        max: currentTemp + 5,
        current: currentTemp,
      },
      condition,
      humidity,
      windSpeed,
      precipitation,
    };
  }
}

