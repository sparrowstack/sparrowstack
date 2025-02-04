import { SystemPrompt } from '@/packages/system-prompt';
import { ToolRegistry } from '@/packages/agent/core/ToolRegistry';
import { ChatMessageManager } from '@/packages/agent/core/ChatMessageManager';
import { ProviderName } from '@/packages/agent/core/providers/BaseProvider/common/enums';

export interface IConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}
