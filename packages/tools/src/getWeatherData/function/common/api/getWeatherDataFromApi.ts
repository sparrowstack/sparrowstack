import axios from 'axios';
import { Unit } from '@tools/getWeatherData/function/common/enums';
import { getFormattedWeatherData } from '@tools/getWeatherData/function/common/utils';
import { type ApiResponseWeatherData } from '@tools/getWeatherData/function/common/interfaces';
interface Params {
	units: Unit;
	apiKey: string;
	latitude: number;
	longitude: number;
}

export const getWeatherDataFromApi = async ({
	units,
	apiKey,
	latitude,
	longitude,
}: Params) => {
	const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
	const response = await axios.get<ApiResponseWeatherData>(url);
	const { current, timezone: timeZone } = response.data;
	const requestTimestamp = current.dt;
	const weatherData = getFormattedWeatherData({
		current,
		timeZone,
		units,
	});

	return { weatherData, timeZone, requestTimestamp };
};
