import { getWeatherData } from '@sparrowstack/tools/src/getWeatherData/function';
import { Unit } from '@sparrowstack/tools/src/getWeatherData/function/common/enums';

const weatherData = await getWeatherData({
	stateCode: 'CA',
	countryCode: 'US',
	units: Unit.Metric,
	city: 'San Francisco',
});
console.log(weatherData);
