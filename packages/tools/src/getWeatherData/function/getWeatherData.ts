import { Unit } from '@tools/getWeatherData/function/common/enums';
import { formatEventTime } from '@tools/getWeatherData/function/common/utils';
import type {
	IWeatherData,
	IGetWeatherDataParams,
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
}: IGetWeatherDataParams): Promise<IWeatherData> => {
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
