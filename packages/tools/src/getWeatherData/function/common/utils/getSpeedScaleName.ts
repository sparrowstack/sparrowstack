import {
	Unit,
	SpeedMeasurementUnit,
} from '@tools/getWeatherData/function/common/enums';

interface Params {
	units: string;
}

export const getSpeedScaleName = ({ units }: Params) => {
	return units === Unit.Imperial
		? SpeedMeasurementUnit.MilesPerHour
		: SpeedMeasurementUnit.MetersPerSecond;
};
