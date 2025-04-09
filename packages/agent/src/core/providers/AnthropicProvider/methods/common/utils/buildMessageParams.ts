import { Anthropic } from '@anthropic-ai/sdk';
import type { Settings } from '@agent/common/interfaces';
import { ThinkingType } from '@core/providers/AnthropicProvider/common/enums';

interface IParams {
	model: string;
	system: string;
	settings?: Settings;
	responseFormat: Record<string, unknown>;
	tools: Anthropic.Tool[];
	messages: Anthropic.Messages.MessageParam[];
}

export const buildMessageParams = ({
	model,
	tools,
	system,
	messages,
	settings,
	responseFormat,
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
			type: ThinkingType.Enabled,
			budget_tokens: settings.thinkingBudget ?? 16000,
		};
	}

	if (responseFormat) {
		// TODO: Add example for response format accuracy
		messagesParams.system += `
When responding to the user, reply ONLY using the following JSON format:
${JSON.stringify(responseFormat, null, 2)}
`;
	}

	return messagesParams;
};
