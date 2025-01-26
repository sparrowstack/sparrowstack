import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import type { BaseLLM } from '@Agent/core/BaseLLM';
import {
	adaptOpenAIRequest,
	adaptAnthropicRequest,
} from '@Agent/core/ModelRequestAdapter/common/adapters';

interface IModelRequestAdapters {
	(params: {
		llm: BaseLLM;
	}): Promise<
		Anthropic.Messages.Message | OpenAI.Chat.Completions.ChatCompletion
	>;
}

export const modelRequestAdapters: Record<Provider, IModelRequestAdapters> = {
	[Provider.OpenAI]: adaptOpenAIRequest,
	[Provider.Anthropic]: adaptAnthropicRequest,
};
