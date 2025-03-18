import { ProviderName } from '@sparrowstack/core';
import { type ICachedResult } from '@tool/common/interfaces/ICachedResult';

// TODO: This is defined twice, once again in executeToolCalls.ts
export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: unknown[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
