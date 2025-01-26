import { OpenAI } from 'openai';
import { Provider } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';

export const providerSDKs = {
	[Provider.OpenAI]: OpenAI,
	[Provider.Anthropic]: Anthropic,
};
