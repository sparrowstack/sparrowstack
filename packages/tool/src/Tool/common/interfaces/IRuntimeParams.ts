import { ProviderName } from '@sparrowstack/core';
import { type ICachedResult } from '@tool/common/interfaces/ICachedResult';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: unknown[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
