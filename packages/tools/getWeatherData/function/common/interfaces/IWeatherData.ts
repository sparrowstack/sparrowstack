import { type IEventTime } from '@/packages/tools/getWeatherData/function/common/interfaces/IEventTime';
import { type IFormattedWeatherData } from '@/packages/tools/getWeatherData/function/common/interfaces/IFormattedWeatherData';

export interface IWeatherData {
	requestTime: IEventTime;
	weatherData: IFormattedWeatherData;
}
