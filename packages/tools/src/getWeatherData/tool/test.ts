import { Provider } from '@sparrowstack/agent';
import { getWeatherDataTool } from '@tools/getWeatherData/tool/getWeatherDataTool';

console.log('Anthropic');
console.log(getWeatherDataTool.getSchema({ providerName: Provider.Anthropic }));

console.log('OpenAI');
console.log(getWeatherDataTool.getSchema({ providerName: Provider.OpenAI }));
