import { OpenAI } from 'openai';
import { ProviderName } from '@core/providers/BaseProvider/common/enums/ProviderName';
import { Anthropic } from '@anthropic-ai/sdk';

export const providerSDKs = {
	[ProviderName.OpenAI]: OpenAI,
	[ProviderName.Anthropic]: Anthropic,
};
