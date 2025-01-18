import { BaseLLM } from './core/llms';
import { getLLM } from './common/utils';
import type { Model } from './common/types';
import { Provider } from './common/enums/Provider';

interface IConstructorOptions {
	apiKey: string;
	provider: Provider;
	model: Model;
	systemPrompt: string;
}

export class Agent {
	llm: BaseLLM;

	constructor({
		model,
		apiKey,
		provider,
		systemPrompt,
	}: IConstructorOptions) {
		const llm = getLLM({ provider });

		this.llm = new llm({ model, apiKey, systemPrompt });
	}
}
