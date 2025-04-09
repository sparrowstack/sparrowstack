import { Unit } from '@tools/getWeatherData/function/common/enums';

export interface GetWeatherDataParams {
	city: string;
	units?: Unit;
	stateCode: string;
	countryCode: string;
}
