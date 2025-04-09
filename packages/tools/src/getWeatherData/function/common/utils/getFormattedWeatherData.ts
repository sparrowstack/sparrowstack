import type {
	ApiResponseCurrent,
	FormattedWeatherData,
} from '@tools/getWeatherData/function/common/interfaces';
import {
	Unit,
	MeasurementUnit,
} from '@tools/getWeatherData/function/common/enums';
import {
	formatEventTime,
	getSpeedScaleName,
	getTemperatureScaleName,
} from '@tools/getWeatherData/function/common/utils';

interface Params {
	units: Unit;
	timeZone: string;
	current: ApiResponseCurrent;
}

export const getFormattedWeatherData = ({
	units,
	current,
	timeZone,
}: Params): FormattedWeatherData => {
	const formattedWeatherData = {
		sunrise: formatEventTime({
			timeZone,
			timestampSeconds: current.sunrise,
		}),
		sunset: formatEventTime({
			timeZone,
			timestampSeconds: current.sunset,
		}),
		temperature: {
			value: current.temp,
			unit: getTemperatureScaleName({ units }),
		},
		feelsLike: {
			value: current.feels_like,
			unit: getTemperatureScaleName({ units }),
		},
		humidity: {
			value: current.humidity,
			unit: MeasurementUnit.Percent,
		},
		dewPoint: {
			value: current.dew_point,
			unit: getTemperatureScaleName({ units }),
		},
		uvIndex: current.uvi,
		cloudCover: {
			value: current.clouds,
			unit: MeasurementUnit.Percent,
		},
		windSpeed: {
			value: current.wind_speed,
			unit: getSpeedScaleName({ units }),
		},
	};

	return formattedWeatherData;
};
