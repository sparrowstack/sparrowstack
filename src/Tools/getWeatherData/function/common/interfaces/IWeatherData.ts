import type { ICurrentWeather } from '@Tools/getWeatherData/function/common/interfaces';

export interface IWeatherData {
	timezone: string;
	current: ICurrentWeather;
}
