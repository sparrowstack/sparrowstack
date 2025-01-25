import { Provider } from '@Agent';
import type { BaseLLM } from '@BaseLLM';
import {
	adaptOpenAIRequest,
	adaptAnthropicRequest,
} from '@ModelRequestAdapter/common/adapters';

export class ModelRequestAdapter {
	public static async execute({ llm }: { llm: BaseLLM }) {
		const { provider } = llm;

		if (provider === Provider.Anthropic) {
			return adaptAnthropicRequest({ llm });
		} else if (provider === Provider.OpenAI) {
			return adaptOpenAIRequest({ llm });
		} else {
			throw new Error('Provider not supportedd');
		}
	}
}
