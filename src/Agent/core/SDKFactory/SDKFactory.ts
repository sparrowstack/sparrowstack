import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { Provider } from '@Agent';

export class SDKFactory {
	static create(provider: Provider, apiKey: string): OpenAI | Anthropic {
		switch (provider) {
			case Provider.OpenAI:
				return new OpenAI({ apiKey });
			case Provider.Anthropic:
				return new Anthropic({ apiKey });
			default:
				throw new Error(`Provider ${provider} not supported`);
		}
	}
}
