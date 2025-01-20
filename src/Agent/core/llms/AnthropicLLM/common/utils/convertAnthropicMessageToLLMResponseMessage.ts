import { Anthropic } from '@anthropic-ai/sdk';
import type { ILLMResponseMessage } from '@Agent/common/interfaces';
import { getTextContent } from '@Agent/core/llms/AnthropicLLM/common/utils/getTextContent';

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
	const { input_tokens: inputTokens, output_tokens: outputTokens } = usage;
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
		},
		rawMessage: message,
	};

	return llmResponseMessage;
};

// {
//     "id": "msg_019LZDahyujLagiLNC9AV8oh",
//     "type": "message",
//     "role": "assistant",
//     "model": "claude-3-5-sonnet-20241022",
//     "content": [
//       {
//         "type": "text",
//         "text": "Hello! I'm SoftwareEngineerTypeScript, and I'm here to help you with any TypeScript, JavaScript, or full-stack development questions you might have. Whether you need assistance with:\n\n- Code architecture and design patterns\n- TypeScript implementations\n- Frontend or backend development\n- Database design\n- API development\n- Testing strategies\n- Performance optimization\n- Or any other development-related topics\n\nFeel free to ask your questions, and please provide as much context as possible so I can give you the most relevant and helpful answers. What would you like to work on today?"
//       }
//     ],
//     "stop_reason": "end_turn",
//     "stop_sequence": null,
//     "usage": {
//       "input_tokens": 739,
//       "cache_creation_input_tokens": 0,
//       "cache_read_input_tokens": 0,
//       "output_tokens": 120
//     }
//   }
