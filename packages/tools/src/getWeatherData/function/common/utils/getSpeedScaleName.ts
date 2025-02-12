import {
	Unit,
	SpeedMeasurementUnit,
} from '@sparrowstack/tools/src/getWeatherData/function/common/enums';

interface IParams {
	units: string;
}

export const getSpeedScaleName = ({ units }: IParams) => {
	return units === Unit.Imperial
		? SpeedMeasurementUnit.MilesPerHour
		: SpeedMeasurementUnit.MetersPerSecond;
};
