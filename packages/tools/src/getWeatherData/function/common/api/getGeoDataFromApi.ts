import axios from 'axios';
import type { GeoData } from '@tools/getWeatherData/function/common/interfaces';

interface Params {
	city: string;
	stateCode: string;
	countryCode: string;
}

interface GeoDataReturnValue {
	latitude: number;
	longitude: number;
	city: string;
	state: string;
	country: string;
}

export const getGeoDataFromApi = async ({
	city,
	stateCode,
	countryCode,
}: Params): Promise<GeoDataReturnValue> => {
	const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
	const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=${apiKey}`;
	const response = await axios.get(url);
	const data = response.data[0] as GeoData;
	const { lat, lon, country, state, name } = data;
	const formattedGeoData = {
		latitude: lat,
		longitude: lon,
		city: name,
		state: state,
		country: country,
	};

	return formattedGeoData;
};
