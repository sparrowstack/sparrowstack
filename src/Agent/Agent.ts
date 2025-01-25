import { Provider } from '@Agent';
import { BaseLLM } from '@Agent/core/llms';
import { SystemPrompt } from '@SystemPrompt';
import { getLLM } from '@Agent/common/utils';
import { Tool, type IToolParams } from '@Tool';
import type { ISystemPromptParams } from '@SystemPrompt';

interface IConstructorParams {
	model: string;
	apiKey: string;
	provider: Provider;
	tools?: Tool[] | IToolParams[];
	systemPrompt?: SystemPrompt | ISystemPromptParams;
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
