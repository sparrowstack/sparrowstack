import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IModelResponse } from '@ModelResponseAdapter/common/interfaces/IModelResponse';
import { adaptOpenAIResponse, adaptAnthropicResponse } from '@ModelResponseAdapter/common/adapters';

export class ModelResponseAdapter {
	public static adapt({
		provider,
		rawResponse,
	}: {
		provider: Provider;
		rawResponse: Anthropic.Messages.Message | OpenAI.ChatCompletion;
	}): IModelResponse {
		if (provider === Provider.Anthropic) {
			return adaptAnthropicResponse({
				response: rawResponse as Anthropic.Messages.Message,
			});
		} else if (provider === Provider.OpenAI) {
			return adaptOpenAIResponse({
				response: rawResponse as OpenAI.ChatCompletion,
			});
		} else {
			throw new Error('Provider not supportedd');
		}
	}
}
