import type { IApiResponseCurrent } from '@Tools/getWeatherData/function/common/interfaces';

export interface IApiResponseWeatherData {
	timezone: string;
	current: IApiResponseCurrent;
}
