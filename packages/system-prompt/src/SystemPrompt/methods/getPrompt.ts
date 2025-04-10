import { ProviderName } from '@sparrowstack/core';
import type { Prompt } from '@system-prompt/common/interfaces';
import {
	toProviderPrompt,
	toFormattedPrompt,
} from '@system-prompt/common/promptAdapters';

interface Params {
	prompt: Prompt;
	providerName?: ProviderName;
}

export const getPrompt = <ReturnType = string>({
	prompt,
	providerName,
}: Params): ReturnType => {
	const formattedPrompt = toFormattedPrompt({ prompt });
	const providerPrompt = toProviderPrompt<ReturnType>({
		providerName,
		prompt: formattedPrompt,
	});

	return providerPrompt;
};
