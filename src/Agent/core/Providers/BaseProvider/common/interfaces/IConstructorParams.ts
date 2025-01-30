import { SystemPrompt } from '@SystemPrompt';
import { ChatMessageManager } from '@Agent/core/ChatMessageManager';
import { ProviderName } from '@Agent/core/providers/BaseProvider/common/enums';
import type { IToolRegistry } from '@Agent/core/ToolRegistryFactory/common/interfaces';

export interface IConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: IToolRegistry;
	chatMessageManager: ChatMessageManager;
}
