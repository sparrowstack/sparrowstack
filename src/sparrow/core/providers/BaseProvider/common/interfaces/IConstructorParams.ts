import { SystemPrompt } from '@system-prompt';
import { ToolRegistry } from '@sparrow/core/ToolRegistry';
import { ChatMessageManager } from '@sparrow/core/ChatMessageManager';
import { ProviderName } from '@sparrow/core/providers/BaseProvider/common/enums';

export interface IConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}
