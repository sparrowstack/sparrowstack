import { ProviderName } from '@sparrowstack/core';
import { type CachedResult } from '@tool/common/interfaces/CachedResult';

export interface RuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: unknown[];
	callCount: number;
	cachedResults: CachedResult[];
	lastCachedResult?: CachedResult;
}
