import { Provider } from '../../../common/enums';
import { Anthropic } from '../../../core/llms/anthropic';

const providers = {
	[Provider.Anthropic]: Anthropic,
};

export const getProvider = ({ provider }: { provider: Provider }) => {
	if (!provider) {
		throw new Error('Provider not supported');
	} else {
		return providers[provider];
	}
};
