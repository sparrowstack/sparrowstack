import type { ApiResponseCurrent } from '@tools/getWeatherData/function/common/interfaces';

export interface ApiResponseWeatherData {
	timezone: string;
	current: ApiResponseCurrent;
}
