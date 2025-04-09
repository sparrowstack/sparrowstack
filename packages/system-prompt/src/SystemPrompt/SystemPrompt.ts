import { ProviderName } from '@sparrowstack/core';
import { Type } from '@system-prompt/common/enums';
import { getPrompt } from '@system-prompt/methods/getPrompt';
import type {
	Prompt,
	SystemPromptParams,
} from '@system-prompt/common/interfaces';

export class SystemPrompt {
	public name: string;
	public description: string;
	public createdBy: string;
	public prompt: Prompt;
	readonly type = Type.SystemPrompt as const;

	constructor({ name, description, createdBy, prompt }: SystemPromptParams) {
		this.name = name;
		this.description = description ?? '';
		this.createdBy = createdBy ?? '';
		this.prompt = prompt;
	}

	public getPrompt<ReturnType = string>({
		providerName,
	}: { providerName?: ProviderName } = {}): ReturnType {
		return getPrompt<ReturnType>({
			providerName,
			prompt: this.prompt,
		});
	}
}
