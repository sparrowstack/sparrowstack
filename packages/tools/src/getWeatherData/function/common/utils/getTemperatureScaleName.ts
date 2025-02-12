import {
	Unit,
	TemperatureMeasurementUnit,
} from '@sparrowstack/tools/src/getWeatherData/function/common/enums';

interface IParams {
	units: string;
}

export const getTemperatureScaleName = ({ units }: IParams) => {
	return units === Unit.Imperial
		? TemperatureMeasurementUnit.Fahrenheit
		: TemperatureMeasurementUnit.Celsius;
};
