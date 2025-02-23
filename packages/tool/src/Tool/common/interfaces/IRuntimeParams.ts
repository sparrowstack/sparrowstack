import { ProviderName } from '@sparrowstack/core';
import { type IChatMessage } from '@sparrowstack/chat-message-manager';
import { type ICachedResult } from '@tool/common/interfaces/ICachedResult';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
