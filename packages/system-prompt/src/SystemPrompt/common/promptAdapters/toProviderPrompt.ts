import { ProviderName } from '@sparrowstack/core';
import { toGoogleGenerativeAPrompt } from '@system-prompt/common/promptAdapters/providerAdapters/toGoogleGenerativeAIPrompt';

interface Params {
	prompt: string;
	providerName?: ProviderName;
}

export const toProviderPrompt = <ReturnType = string>({
	prompt,
	providerName,
}: Params): ReturnType => {
	let providerPrompt: ReturnType = prompt as ReturnType;

	if (providerName === ProviderName.GoogleGenerativeAI) {
		providerPrompt = toGoogleGenerativeAPrompt({ prompt }) as ReturnType;
	}

	return providerPrompt;
};
