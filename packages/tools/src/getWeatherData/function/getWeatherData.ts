import { Unit } from '@tools/getWeatherData/function/common/enums';
import { formatEventTime } from '@tools/getWeatherData/function/common/utils';
import type {
	WeatherData,
	GetWeatherDataParams,
} from '@tools/getWeatherData/function/common/interfaces';
import {
	getGeoDataFromApi,
	getWeatherDataFromApi,
} from '@tools/getWeatherData/function/common/api';

export const getWeatherData = async ({
	city,
	stateCode,
	countryCode,
	units = Unit.Imperial,
}: GetWeatherDataParams): Promise<WeatherData> => {
	const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY as string;
	const { latitude, longitude } = await getGeoDataFromApi({
		city,
		stateCode,
		countryCode,
	});
	const { timeZone, weatherData, requestTimestamp } =
		await getWeatherDataFromApi({
			units,
			apiKey,
			latitude,
			longitude,
		});
	const requestTime = formatEventTime({
		timeZone,
		timestampSeconds: requestTimestamp,
	});

	return { requestTime, weatherData };
};
