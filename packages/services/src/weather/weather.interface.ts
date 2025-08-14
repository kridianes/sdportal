export interface WeatherForecast {
  date: string;
  temperature: {
    min: number;
    max: number;
    current: number;
  };
  condition: WeatherCondition;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export enum WeatherCondition {
  SUNNY = 'sunny',
  PARTLY_CLOUDY = 'partly_cloudy',
  CLOUDY = 'cloudy',
  RAIN = 'rain',
  THUNDERSTORM = 'thunderstorm',
  SNOW = 'snow',
  FOG = 'fog',
}

export interface WeatherService {
  /**
   * Get weather forecast for a location by dates
   */
  getForecastByDates(
    location: string,
    startDate: Date,
    endDate: Date
  ): Promise<WeatherForecast[]>;
  
  /**
   * Get current weather for a location
   */
  getCurrentWeather(location: string): Promise<WeatherForecast>;
}

