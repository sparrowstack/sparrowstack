import { Anthropic } from '@anthropic-ai/sdk';
import type { Settings } from '@agent/common/interfaces';
import { ThinkingType } from '@core/providers/AnthropicProvider/common/enums';

interface IParams {
	model: string;
	system: string;
	settings?: Settings;
	tools: Anthropic.Tool[];
	structuredOutput: any;
	messages: Anthropic.Messages.MessageParam[];
}

export const buildMessageParams = ({
	model,
	tools,
	system,
	messages,
	settings,
	structuredOutput,
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

	if (structuredOutput) {
		messagesParams.system += `
<structured-output>
When responding to the user, use the following JSON format:
${JSON.stringify(structuredOutput, null, 2)}}
</structured-output>

<tool-calling>
However, when using tools, respond in the standard tool calling format without any additional formatting.
</tool-calling>
`;
	}

	return messagesParams;
};
