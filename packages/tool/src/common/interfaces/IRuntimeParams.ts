import type { IChatMessage } from '@sparrowstack/agent/src/core/ChatMessage';
import { type ICachedResult } from '@tool/common/interfaces/ICachedResult';
import { ProviderName } from '@sparrowstack/agent/src/core/providers/BaseProvider/common/enums/ProviderName';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
