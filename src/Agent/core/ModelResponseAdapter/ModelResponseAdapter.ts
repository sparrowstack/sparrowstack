import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';
import { type IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';
import { modelResponseAdapters } from '@Agent/core/ModelResponseAdapter/common/constants';

export class ModelResponseAdapter {
	public static adapt({
		provider,
		rawResponse,
	}: {
		provider: Provider;
		rawResponse: Anthropic.Messages.Message | OpenAI.ChatCompletion;
	}): IModelResponse {
		const adapter = modelResponseAdapters[provider];

		return adapter({ response: rawResponse });
	}
}
