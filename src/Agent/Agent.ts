import { BaseLLM } from '@Agent/core/llms';
import { getLLM } from '@Agent/common/utils';
import { Provider } from '@Agent/common/enums/Provider';

interface IConstructorOptions {
	model: string;
	apiKey: string;
	provider: Provider;
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
