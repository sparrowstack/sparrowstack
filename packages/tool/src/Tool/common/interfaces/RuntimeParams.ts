import { ProviderName } from '@sparrowstack/core';
import { type CachedResult } from '@tool/common/interfaces/CachedResult';

// TODO: This is defined twice, once again in executeToolCalls.ts
export interface RuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: unknown[];
	callCount: number;
	cachedResults: CachedResult[];
	lastCachedResult?: CachedResult;
}
