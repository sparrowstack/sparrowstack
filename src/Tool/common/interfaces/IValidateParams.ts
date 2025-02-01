import type { IChatMessage } from '@Agent/core/ChatMessage';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums/ProviderName';

export interface IValidateParams {
	model: string;
	provider: ProviderName;
	systemPrompt: string;
	messages: IChatMessage[];
	callCount: number;
	cachedResults: any[];
	lastCachedResult: any;
}
