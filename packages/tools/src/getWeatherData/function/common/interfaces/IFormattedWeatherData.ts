import type { IEventTime } from '@tools/getWeatherData/function/common/interfaces';

export interface IFormattedWeatherData {
	sunrise: IEventTime;
	sunset: IEventTime;
	temperature: {
		value: number;
		unit: string;
	};
	feelsLike: {
		value: number;
		unit: string;
	};
	humidity: {
		value: number;
		unit: string;
	};
	dewPoint: {
		value: number;
		unit: string;
	};
	uvIndex: number;
	cloudCover: {
		value: number;
		unit: string;
	};
	windSpeed: {
		value: number;
		unit: string;
	};
}
