import { Unit } from '@sparrowstack/tools/src/getWeatherData/function/common/enums';

export interface IGetWeatherDataParams {
	city: string;
	units?: Unit;
	stateCode: string;
	countryCode: string;
}
