import type { Tool } from '@Tool';
import { SystemPrompt } from '@SystemPrompt';
import { Provider } from '@Agent/common/enums';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';

export interface IConstructorParams {
	model: string;
	tools: Tool[];
	apiKey: string;
	displayName: string;
	providerName: Provider;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}
