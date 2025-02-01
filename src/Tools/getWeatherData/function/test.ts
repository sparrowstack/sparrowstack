import { getWeatherData } from '@Tools/getWeatherData/function';
import { Unit } from '@Tools/getWeatherData/function/common/enums';

const weatherData = await getWeatherData({
	stateCode: 'CA',
	countryCode: 'US',
	units: Unit.Metric,
	city: 'San Francisco',
});
console.log(weatherData);
