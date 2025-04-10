import { type EventTime } from '@tools/getWeatherData/function/common/interfaces/EventTime';
import { type FormattedWeatherData } from '@tools/getWeatherData/function/common/interfaces/FormattedWeatherData';

export interface WeatherData {
	requestTime: EventTime;
	weatherData: FormattedWeatherData;
}
