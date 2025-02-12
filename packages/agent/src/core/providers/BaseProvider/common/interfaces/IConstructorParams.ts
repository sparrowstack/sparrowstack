import { SystemPrompt } from '@sparrowstack/system-prompt';
import { ToolRegistry } from '@core/ToolRegistry';
import { ChatMessageManager } from '@core/ChatMessageManager';
import { ProviderName } from '@core/providers/BaseProvider/common/enums';

export interface IConstructorParams {
	model: string;
	apiKey: string;
	name: ProviderName;
	displayName: string;
	systemPrompt: SystemPrompt;
	toolRegistry: ToolRegistry;
	chatMessageManager: ChatMessageManager;
}
