import { Provider } from '@Agent';
import { BaseLLM } from '@BaseLLM';
import { SystemPrompt } from '@SystemPrompt';
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
		this.llm = new BaseLLM({
			model,
			apiKey,
			tools,
			provider,
			systemPrompt,
		});
	}
}
