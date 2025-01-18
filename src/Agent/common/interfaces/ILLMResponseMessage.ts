import type { LLMResponseMessageRaw } from '../types';

export interface IUsage {
	inputTokens: number | null;
	outputTokens: number | null;
	cacheCreationInputTokens: number | null;
	cacheReadInputTokens: number | null;
}

export interface ILLMResponseMessage {
	// Message metadata
	id: string;
	type: string;
	role: string;
	model: string;

	// TODO: Add support for an array of content types later, when needed
	// Content/Text related
	contentType: string;
	contentText: string;

	// Sequence information
	stopReason: string | null;
	stopSequence: string | null;

	// Usage statistics
	usage: IUsage;

	// Tool usage (function calling)
	toolCalls?: Array<{
		id: string;
		type: 'function';
		function: {
			name: string;
			arguments: string;
		};
	}>;

	// Additional metadata
	created?: number; // Unix timestamp
	systemFingerprint?: string; // OpenAI specific , but useful for tracking
	rawMessage: LLMResponseMessageRaw;
}

// Anthropic LLM Response
// --------------------------------
// {
//   "id": "msg_01ATpZKNngR85HFtrEGxdpKT",
//   "type": "message",
//   "role": "assistant",
//   "model": "claude-3-5-sonnet-20241022",
//   "content": [
//     {
//       "type": "text",
//       "text": "Hi there! I'm here to help you with TypeScript-related questions. Whether you need help with:\n\n- Type definitions and annotations\n- Interfaces and types\n- Generics\n- Classes and inheritance\n- TypeScript configuration\n- Best practices\n- Or any other TypeScript-related topics\n\nFeel free to ask, and I'll do my best to assist you!"
//     }
//   ],
//   "stop_reason": "end_turn",
//   "stop_sequence": null,
//   "usage": {
//     "input_tokens": 23,
//     "cache_creation_input_tokens": 0,
//     "cache_read_input_tokens": 0,
//     "output_tokens": 82
//   }
// }
