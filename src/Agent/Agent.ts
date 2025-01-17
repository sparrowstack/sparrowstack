import { getLLM } from './common/utils';
import { BaseLLM } from '../core/llms/BaseLLM';
import { Provider, AnthropicModel } from '../common/enums';

interface IConstructorOptions {
	apiKey: string;
	provider: Provider;
	model: AnthropicModel;
}

export class Agent {
	llm: BaseLLM;

	constructor({ provider, model, apiKey }: IConstructorOptions) {
		const llm = getLLM({ provider });

		this.llm = new llm({ model, apiKey });
	}
}
