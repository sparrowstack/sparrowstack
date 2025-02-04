import { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@agent/core/ToolRegistry';
import { ChatMessageManager } from '@agent/core/ChatMessageManager';
import { ProviderName } from '@agent/core/providers/BaseProvider/common/enums';

export interface IConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}
