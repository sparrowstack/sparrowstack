import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces/IModelResponse';
import {
	adaptOpenAIResponse,
	adaptAnthropicResponse,
} from '@Agent/core/ModelResponseAdapter/common/adapters';

// LEFT OFF - Consolidate this TYPE
type ModelResponse = OpenAI.ChatCompletion | Anthropic.Messages.Message;

interface IModelResponseAdapter {
	(params: { response: ModelResponse }): IModelResponse;
}

export const modelResponseAdapters: Record<Provider, IModelResponseAdapter> = {
	[Provider.OpenAI]: ({ response }) =>
		adaptOpenAIResponse({ response: response as OpenAI.ChatCompletion }),
	[Provider.Anthropic]: ({ response }) =>
		adaptAnthropicResponse({
			response: response as Anthropic.Messages.Message,
		}),
};
