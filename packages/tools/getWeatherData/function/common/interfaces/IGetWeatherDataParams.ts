import { Unit } from '@/packages/tools/getWeatherData/function/common/enums';

export interface IGetWeatherDataParams {
	city: string;
	units?: Unit;
	stateCode: string;
	countryCode: string;
}
