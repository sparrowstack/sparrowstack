import {
	Unit,
	TemperatureMeasurementUnit,
} from '@Tools/getWeatherData/function/common/enums';

interface IParams {
	units: string;
}

export const getTemperatureScaleName = ({ units }: IParams) => {
	return units === Unit.Imperial
		? TemperatureMeasurementUnit.Fahrenheit
		: TemperatureMeasurementUnit.Celsius;
};
