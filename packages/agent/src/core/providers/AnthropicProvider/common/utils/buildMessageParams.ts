import { Anthropic } from '@anthropic-ai/sdk';
import type { Settings } from '@agent/common/interfaces';

interface IParams {
	model: string;
	system: string;
	settings?: Settings;
	tools: Anthropic.Tool[];
	messages: Anthropic.Messages.MessageParam[];
}

export const buildMessageParams = ({
	model,
	tools,
	system,
	messages,
	settings,
}: IParams) => {
	// TODO: Add Metadata
	const messagesParams: Anthropic.Messages.MessageCreateParams = {
		model,
		tools,
		system,
		messages,
		stream: settings?.stream ?? false,
		max_tokens: settings?.maxTokens ?? 4096,
		temperature: settings?.temperature ?? 0.5,
	};

	if (settings?.toolChoice) {
		messagesParams.tool_choice = {
			type: settings.toolChoice,
		};
	}

	if (settings?.thinking) {
		messagesParams.thinking = {
			type: 'enabled',
			budget_tokens: settings.thinkingBudget ?? 16000,
		};
	}

	return messagesParams;
};
