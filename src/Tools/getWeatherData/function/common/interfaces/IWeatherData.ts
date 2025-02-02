import { type IEventTime } from '@Tools/getWeatherData/function/common/interfaces/IEventTime';
import { type IFormattedWeatherData } from '@Tools/getWeatherData/function/common/interfaces/IFormattedWeatherData';

export interface IWeatherData {
	requestTime: IEventTime;
	weatherData: IFormattedWeatherData;
}
