import { Provider } from '@Agent/common/enums';
import { AnthropicLLM, OpenAILLM } from '@Agent/core/llms';

const providersLLM = {
	[Provider.OpenAI]: OpenAILLM,
	[Provider.Anthropic]: AnthropicLLM,
};

interface IParams {
	provider: Provider;
}

export const getLLM = ({ provider }: IParams) => {
	if (!provider) {
		throw new Error('Provider Required');
	} else if (!providersLLM[provider]) {
		throw new Error('Provider not supported');
	} else {
		return providersLLM[provider];
	}
};
