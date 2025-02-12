import type { IApiResponseCurrent } from '@sparrowstack/tools/src/getWeatherData/function/common/interfaces';

export interface IApiResponseWeatherData {
	timezone: string;
	current: IApiResponseCurrent;
}
