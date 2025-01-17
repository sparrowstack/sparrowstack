import { getLLM } from './common/utils';
import type { IBaseLLM } from '../common/interfaces';
import { Provider, AnthropicModel } from '../common/enums';

interface IConstructorOptions {
	apiKey: string;
	provider: Provider;
	model: AnthropicModel;
}

export class Agent {
	llm: IBaseLLM;

	constructor({ provider, model, apiKey }: IConstructorOptions) {
		const llm = getLLM({ provider });

		this.llm = new llm({ model, apiKey });
	}
}
