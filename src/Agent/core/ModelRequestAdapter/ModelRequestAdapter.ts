import type { BaseLLM } from '@Agent/core/BaseLLM';
import { modelRequestAdapters } from '@Agent/core/ModelRequestAdapter/common/constants';

export class ModelRequestAdapter {
	public static async execute({ llm }: { llm: BaseLLM }) {
		const { provider } = llm;
		const adapter = modelRequestAdapters[provider];

		return adapter({ llm });
	}
}
