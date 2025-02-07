import { getWeatherData } from '@tools/getWeatherData/function';
import { Unit } from '@tools/getWeatherData/function/common/enums';

const weatherData = await getWeatherData({
	stateCode: 'CA',
	countryCode: 'US',
	units: Unit.Metric,
	city: 'San Francisco',
});
console.log(weatherData);
