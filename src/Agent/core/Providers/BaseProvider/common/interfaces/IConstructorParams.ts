import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { ProviderName } from '@Agent/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';

export interface IConstructorParams {
	model: string;
	tools: Tool[];
	apiKey: string;
	displayName: string;
	providerName: ProviderName;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}
