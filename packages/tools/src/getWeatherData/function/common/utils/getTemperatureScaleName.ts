import {
	Unit,
	TemperatureMeasurementUnit,
} from '@tools/getWeatherData/function/common/enums';

interface Params {
	units: string;
}

export const getTemperatureScaleName = ({ units }: Params) => {
	return units === Unit.Imperial
		? TemperatureMeasurementUnit.Fahrenheit
		: TemperatureMeasurementUnit.Celsius;
};
