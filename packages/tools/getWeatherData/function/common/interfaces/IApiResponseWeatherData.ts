import type { IApiResponseCurrent } from '@/packages/tools/getWeatherData/function/common/interfaces';

export interface IApiResponseWeatherData {
	timezone: string;
	current: IApiResponseCurrent;
}
