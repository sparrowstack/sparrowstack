import { Anthropic } from '@anthropic-ai/sdk';
import { getTextContent } from './getTextContent';
import type { ILLMResponseMessage } from '../../../../../common/interfaces';

export const convertAnthropicMessageToLLMResponseMessage = ({
	message,
}: {
	message: Anthropic.Messages.Message;
}): ILLMResponseMessage => {
	const {
		id,
		role,
		type,
		model,
		stop_reason: stopReason,
		stop_sequence: stopSequence,
		usage,
	} = message;
	const {
		input_tokens: inputTokens,
		output_tokens: outputTokens,
		cache_creation_input_tokens: cacheCreationInputTokens,
		cache_read_input_tokens: cacheReadInputTokens,
	} = usage;
	const { text: contentText, type: contentType } = getTextContent({
		message,
	});

	const llmResponseMessage: ILLMResponseMessage = {
		id,
		role,
		model,
		type,
		contentType,
		contentText,
		stopReason,
		stopSequence,
		usage: {
			inputTokens,
			outputTokens,
			cacheCreationInputTokens,
			cacheReadInputTokens,
		},
		rawMessage: message,
	};

	return llmResponseMessage;
};
