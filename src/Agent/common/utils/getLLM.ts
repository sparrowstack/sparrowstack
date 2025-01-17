import { Provider } from '../../../common/enums';
import { AnthropicLLM } from '../../../core/llms';

const providersLLM = {
	[Provider.Anthropic]: AnthropicLLM,
};

interface IOptions {
	provider: Provider;
}

export const getLLM = ({ provider }: IOptions) => {
	if (!provider) {
		throw new Error('Provider not supported');
	} else {
		return providersLLM[provider];
	}
};
