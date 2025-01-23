import { BaseLLM } from '@Agent/core/llms';
import { getLLM } from '@Agent/common/utils';
import { Provider } from '@Agent/common/enums/Provider';
import type { IToolSchema } from '@Agent/core/Tools/common/interfaces/IToolSchema';

interface IConstructorOptions {
	model: string;
	apiKey: string;
	provider: Provider;
	systemPrompt: string;
	tools?: IToolSchema[];
}

export class Agent {
	llm: BaseLLM;

	constructor({
		model,
		tools,
		apiKey,
		provider,
		systemPrompt,
	}: IConstructorOptions) {
		const llm = getLLM({ provider });

		this.llm = new llm({ model, apiKey, systemPrompt, tools });
	}
}
