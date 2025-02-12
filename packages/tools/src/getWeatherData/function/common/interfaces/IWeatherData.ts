import { type IEventTime } from '@tools/getWeatherData/function/common/interfaces/IEventTime';
import { type IFormattedWeatherData } from '@tools/getWeatherData/function/common/interfaces/IFormattedWeatherData';

export interface IWeatherData {
	requestTime: IEventTime;
	weatherData: IFormattedWeatherData;
}
