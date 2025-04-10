import type { Settings } from '@agent/common/interfaces';
import { FunctionCallingMode as FunctionCallingModeEnum } from '@google/generative-ai';
import { MimeType } from '@core/providers/GoogleGenerativeAIProvider/methods/common/enums';
import type {
	Part,
	Content,
	ResponseSchema,
	StartChatParams,
} from '@google/generative-ai';

interface Params {
	settings?: Settings;
	isFunctionMessage?: boolean;
	history: Content[] | undefined;
	responseFormat?: ResponseSchema;
	systemInstruction: string | Content | Part | undefined;
}

export const buildChatParams = ({
	history,
	settings,
	responseFormat,
	systemInstruction,
}: Params) => {
	const chatParams: StartChatParams = {
		history,
		systemInstruction,
		generationConfig: {
			maxOutputTokens: settings?.maxTokens ?? 4096,
			temperature: settings?.temperature ?? 0.5,
		},
		toolConfig: {
			functionCallingConfig: {
				mode: FunctionCallingModeEnum.AUTO, // Default
			},
		},
	};

	if (responseFormat) {
		chatParams.generationConfig = {
			...chatParams.generationConfig,
			responseMimeType: MimeType.Json,
			responseSchema: responseFormat,
		};
	}

	return chatParams;
};

// TODO: Gemini doesn't support structured output yet, in a way thats
// flexible enough to support the tool calling format and general chat
// Will update this when Gemini supports structured output in a more flexible way

// 	if (structuredOutputAgent) {
// 		if (
// 			chatParams.systemInstruction &&
// 			typeof chatParams.systemInstruction !== 'string' &&
// 			'parts' in chatParams.systemInstruction
// 		) {
// 			chatParams.systemInstruction.parts[0].text += `
// <structured-output>
// When responding to the user, reuturn a JSON object with the following format:
// ${JSON.stringify(structuredOutputAgent, null, 2)}}
// </structured-output>

// <tool-calling>
// However, when using tools, respond in the standard tool calling format without any additional formatting.
// </tool-calling>
// `;
// 		}
// 	}
