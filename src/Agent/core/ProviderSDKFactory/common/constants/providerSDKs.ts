import { OpenAI } from 'openai';
import { ProviderName } from '@Agent';
import { Anthropic } from '@anthropic-ai/sdk';

export const providerSDKs = {
	[ProviderName.OpenAI]: OpenAI,
	[ProviderName.Anthropic]: Anthropic,
};
