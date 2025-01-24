import type { IToolParams } from '@Tool';
import { BaseLLM } from '@Agent/core/llms';
import { getLLM } from '@Agent/common/utils';
import { Provider } from '@Agent/common/enums/Provider';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	systemPrompt?: string;
	tools?: IToolParams[];
}

export class Agent {
	llm: BaseLLM;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt,
	}: IConstructorParams) {
		const llm = getLLM({ provider });

		this.llm = new llm({ model, apiKey, systemPrompt, tools });
	}
}
