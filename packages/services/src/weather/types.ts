export type WeatherCondition =
  | 'clear'
  | 'partly-cloudy'
  | 'cloudy'
  | 'rain'
  | 'thunderstorm'
  | 'snow'
  | 'fog'
  | 'wind';

export interface WeatherForecast {
  date: string; // ISO date string
  condition: WeatherCondition;
  temperatureC: number;
  temperatureF: number;
  precipitationChance: number; // 0-1
  humidity: number; // 0-1
  windSpeed: number; // km/h
  sunrise: string; // HH:MM format
  sunset: string; // HH:MM format
  icon: string; // URL or icon code
}

export interface WeatherService {
  /**
   * Get weather forecast for a location by dates
   * @param location The location name
   * @param startDate The start date (ISO string)
   * @param endDate The end date (ISO string)
   * @returns A promise that resolves to an array of weather forecasts
   */
  getForecastByDates(
    location: string,
    startDate: string,
    endDate: string
  ): Promise<WeatherForecast[]>;
  
  /**
   * Get current weather for a location
   * @param location The location name
   * @returns A promise that resolves to the current weather forecast
   */
  getCurrentWeather(location: string): Promise<WeatherForecast>;
  
  /**
   * Get weather icon URL
   * @param condition The weather condition
   * @returns The URL for the weather icon
   */
  getWeatherIconUrl(condition: WeatherCondition): string;
}

