import { ProviderName } from '@sparrowstack/core';
import { toGoogleGenerativeAIPrompt } from '@system-prompt/common/promptAdapters/toProviderAdapters';

interface IParams {
	prompt: string;
	providerName?: ProviderName;
}

export const toProviderPrompt = <ReturnType = string>({
	prompt,
	providerName,
}: IParams): ReturnType => {
	let providerPrompt: ReturnType = prompt as ReturnType;

	if (providerName === ProviderName.GoogleGenerativeAI) {
		providerPrompt = toGoogleGenerativeAIPrompt({ prompt }) as ReturnType;
	}

	return providerPrompt;
};
