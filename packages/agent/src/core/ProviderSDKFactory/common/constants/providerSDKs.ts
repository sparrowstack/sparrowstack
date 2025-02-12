import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { ProviderName } from '@sparrowstack/core';

export const providerSDKs = {
	[ProviderName.OpenAI]: OpenAI,
	[ProviderName.Anthropic]: Anthropic,
};
