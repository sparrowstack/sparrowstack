import { Provider } from '@Agent';
import type { BaseLLM } from '@Agent/core/llms/BaseLLM';
import { adaptAnthropicRequest } from '@ModelRequestAdapter/common/adapters';

export class ModelRequestAdapter {
	public static async execute({ llm }: { llm: BaseLLM }) {
		const { provider } = llm;

		if (provider === Provider.Anthropic) {
			return adaptAnthropicRequest({ llm });
		} else {
			throw new Error('Provider not supportedd');
		}
	}
}
