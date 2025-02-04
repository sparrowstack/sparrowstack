import type { IChatMessage } from '@/packages/agent/core/ChatMessage';
import { type ICachedResult } from '@/packages/tool/common/interfaces/ICachedResult';
import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums/ProviderName';

export interface IRuntimeParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: ICachedResult[];
	lastCachedResult?: ICachedResult;
}
