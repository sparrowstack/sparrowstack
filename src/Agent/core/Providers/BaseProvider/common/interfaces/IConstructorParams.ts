import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';

export interface IConstructorParams {
	model: string;
	tools: Tool[];
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}
