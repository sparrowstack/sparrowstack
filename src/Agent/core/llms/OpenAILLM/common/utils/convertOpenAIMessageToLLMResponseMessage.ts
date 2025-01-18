import OpenAI from 'openai';
import { getChoiceParams } from './getChoiceParams';
import type { ILLMResponseMessage } from '../../../../../common/interfaces';

export const convertOpenAIMessageToLLMResponseMessage = ({
	message,
}: {
	message: OpenAI.ChatCompletion;
}): ILLMResponseMessage => {
	const { id, model, usage } = message;
	const { prompt_tokens: inputTokens, completion_tokens: outputTokens } =
		usage || {};
	const {
		role,
		content: contentText,
		finish_reason: stopReason,
	} = getChoiceParams({
		message,
		index: 0,
	});

	const llmResponseMessage = {
		id,
		role,
		model,
		type: 'message', // TODO: Find way to dynamically update
		contentType: 'text', // TODO: Find way to dynamically update
		contentText,
		stopReason,
		usage: {
			inputTokens,
			outputTokens,
		},
		rawMessage: message,
	} as ILLMResponseMessage;

	return llmResponseMessage as ILLMResponseMessage;
};

// OpenAI::ResponseMessage {
//   id: "chatcmpl-Ar5WdbkadhvM0qHSFKB0qoMu3HJzD",
//   object: "chat.completion",
//   created: 1737215987,
//   model: "gpt-4o-2024-08-06",
//   choices: [
//     {
//       index: 0,
//       message: {
//         role: "assistant",
//         content: "```typescript\n// src/utils/addNumbers.ts\n\ninterface IOptions {\n  firstNumber: number;\n  secondNumber: number;\n}\n\nexport const addNumbers = ({ firstNumber, secondNumber }: IOptions): number => {\n  return firstNumber + secondNumber;\n};\n```",
//         refusal: null,
//       },
//       logprobs: null,
//       finish_reason: "stop",
//     }
//   ],
//   usage: {
//     prompt_tokens: 707,
//     completion_tokens: 56,
//     total_tokens: 763,
//     prompt_tokens_details: {
//       cached_tokens: 0,
//       audio_tokens: 0,
//     },
//     completion_tokens_details: {
//       reasoning_tokens: 0,
//       audio_tokens: 0,
//       accepted_prediction_tokens: 0,
//       rejected_prediction_tokens: 0,
//     },
//   },
//   service_tier: "default",
//   system_fingerprint: "fp_50cad350e4",
//   _request_id: "req_a00fed83a975d6f3258a851cf8742be8",
// }
