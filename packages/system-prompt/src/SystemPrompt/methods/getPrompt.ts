import { ProviderName } from '@sparrowstack/core';
import type { IPrompt } from '@system-prompt/common/interfaces';
import {
	toProviderPrompt,
	toFormattedPrompt,
} from '@system-prompt/common/promptAdapters';

interface IParams {
	prompt: IPrompt;
	providerName?: ProviderName;
}

export const getPrompt = <ReturnType = string>({
	prompt,
	providerName,
}: IParams): ReturnType => {
	const formattedPrompt = toFormattedPrompt({ prompt });
	const providerPrompt = toProviderPrompt<ReturnType>({
		providerName,
		prompt: formattedPrompt,
	});

	return providerPrompt;
};
