import OpenAI from 'openai';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';
import { getChoiceParams } from '@Agent/core/ModelResponseAdapter/common/adapters/adaptOpenAIResponse/common/utils/getChoiceParams';

export const adaptOpenAIResponse = ({
	response,
}: {
	response: OpenAI.ChatCompletion;
}): IModelResponse => {
	const { id, model, usage } = response;
	const { prompt_tokens: inputTokens, completion_tokens: outputTokens } =
		usage || {};
	const {
		role,
		content: text,
		finish_reason: stopReason,
	} = getChoiceParams({
		response,
		index: 0,
	});

	const modelResponse: IModelResponse = {
		id,
		role,
		model,
		type: 'message', // TODO: Find way to dynamically update
		text: text || '',
		stopReason,
		usage: {
			inputTokens: inputTokens ?? null,
			outputTokens: outputTokens ?? null,
		},
		rawMessage: response,
	};

	return modelResponse;
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
//         content: "```typescript\n// src/utils/addNumbers.ts\n\ninterface IParams {\n  firstNumber: number;\n  secondNumber: number;\n}\n\nexport const addNumbers = ({ firstNumber, secondNumber }: IParams): number => {\n  return firstNumber + secondNumber;\n};\n```",
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
