import { Provider } from '@Agent/common/enums';
import { AnthropicLLM, OpenAILLM } from '@Agent/core/llms';

const providersLLM = {
	[Provider.OpenAI]: OpenAILLM,
	[Provider.Anthropic]: AnthropicLLM,
};

interface IOptions {
	provider: Provider;
}

// User should get type errors in this scenario
// so just throwing minimal error messages for now..
export const getLLM = ({ provider }: IOptions) => {
	if (!provider) {
		throw new Error('Provider Required');
	} else if (!providersLLM[provider]) {
		throw new Error('Provider not supported');
	} else {
		return providersLLM[provider];
	}
};
