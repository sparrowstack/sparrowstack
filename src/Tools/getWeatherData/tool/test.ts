import { Provider } from '@sparrowstack/sparrow';
import { getWeatherDataTool } from '@Tools/getWeatherData/tool/getWeatherDataTool';

console.log('Anthropic');
console.log(getWeatherDataTool.getSchema({ providerName: Provider.Anthropic }));

console.log('OpenAI');
console.log(getWeatherDataTool.getSchema({ providerName: Provider.OpenAI }));
