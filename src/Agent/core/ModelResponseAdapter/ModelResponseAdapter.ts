import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces/IModelResponse';
import { adaptAnthropicResponse } from '@Agent/core/ModelResponseAdapter/common/adapters';

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
		}
		// Implementation will go here
		throw new Error('Not implemented');
	}
}
