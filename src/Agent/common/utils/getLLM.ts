import { Provider } from '../enums';
import { AnthropicLLM, OpenAILLM } from '../../core/llms';

const providersLLM = {
	[Provider.OpenAI]: OpenAILLM,
	[Provider.Anthropic]: AnthropicLLM,
};

interface IOptions {
	provider: Provider;
}

// TODO: Add Better Error Messaging
export const getLLM = ({ provider }: IOptions) => {
	if (!provider) {
		throw new Error('Provider Required');
	} else if (!providersLLM[provider]) {
		throw new Error('Provider not supported');
	} else {
		return providersLLM[provider];
	}
};
