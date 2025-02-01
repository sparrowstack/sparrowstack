import axios from 'axios';
import { Unit } from '@Tools/getWeatherData/function/common/enums';
import { getFormattedWeatherData } from '@Tools/getWeatherData/function/common/utils';

interface IParams {
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
}: IParams) => {
	const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
	const response = await axios.get(url);
	const { current, timezone: timeZone } = response.data;
	const requestTimestamp = current.dt;
	const weatherData = getFormattedWeatherData({
		current,
		timeZone,
		units,
	});

	return { weatherData, timeZone, requestTimestamp };
};
