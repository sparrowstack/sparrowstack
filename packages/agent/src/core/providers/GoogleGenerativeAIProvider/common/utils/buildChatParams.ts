import type { Settings } from '@agent/common/interfaces';
import { FunctionCallingMode as FunctionCallingModeEnum } from '@google/generative-ai';
import type {
	Part,
	Content,
	StartChatParams,
	FunctionCallingMode,
} from '@google/generative-ai';

interface IParams {
	settings?: Settings;
	history: Content[] | undefined;
	systemInstruction: string | Content | Part | undefined;
}

export const buildChatParams = ({
	history,
	settings,
	systemInstruction,
}: IParams) => {
	// const { temperature, topP, topK, maxOutputTokens } = settings;
	const chatParams: StartChatParams = {
		history,
		systemInstruction,
		generationConfig: {
			maxOutputTokens: settings?.maxTokens ?? 4096,
			temperature: settings?.temperature ?? 0.5,
		},
		toolConfig: {
			functionCallingConfig: {
				mode:
					(settings?.toolChoice?.toUpperCase() as FunctionCallingMode) ??
					FunctionCallingModeEnum.AUTO,
			},
		},
	};

	return chatParams;
};
