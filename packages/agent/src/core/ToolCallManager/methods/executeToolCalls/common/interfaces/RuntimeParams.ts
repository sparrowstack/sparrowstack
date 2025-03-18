import type { ProviderName } from '@sparrowstack/core';

export interface RuntimeParams {
	model: string;
	provider: ProviderName;
	callCount: number;
	cachedResults: unknown[];
	systemPrompt: string;
	messages: unknown[];
	lastCachedResult: unknown;
}
