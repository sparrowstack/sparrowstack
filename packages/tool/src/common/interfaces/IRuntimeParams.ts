import type { IChatMessage } from '@agent/core/ChatMessage';
import { type ICachedResult } from '@sparrowstack/tool/common/interfaces/ICachedResult';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums/ProviderName';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
