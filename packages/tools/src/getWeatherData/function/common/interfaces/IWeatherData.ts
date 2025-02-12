import { type IEventTime } from '@sparrowstack/tools/src/getWeatherData/function/common/interfaces/IEventTime';
import { type IFormattedWeatherData } from '@sparrowstack/tools/src/getWeatherData/function/common/interfaces/IFormattedWeatherData';

export interface IWeatherData {
	requestTime: IEventTime;
	weatherData: IFormattedWeatherData;
}
