import type { IApiResponseCurrent } from '@tools/getWeatherData/function/common/interfaces';

export interface IApiResponseWeatherData {
	timezone: string;
	current: IApiResponseCurrent;
}
