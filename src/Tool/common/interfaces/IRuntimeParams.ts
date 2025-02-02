import type { IChatMessage } from '@Agent/core/ChatMessage';
import { type ICachedResult } from '@Tool/common/interfaces/ICachedResult';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult: ICachedResult;
}
