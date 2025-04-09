import type { EventTime } from '@tools/getWeatherData/function/common/interfaces';

export interface FormattedWeatherData {
	sunrise: EventTime;
	sunset: EventTime;
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
