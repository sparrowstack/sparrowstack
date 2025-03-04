import { type ProviderName } from '@sparrowstack/core';
import { Type } from '@system-prompt/common/enums';
import { getPrompt } from '@system-prompt/methods/getPrompt';
import type {
	IPrompt,
	ISystemPromptParams,
} from '@system-prompt/common/interfaces';

export class SystemPrompt {
	public name: string;
	public description: string;
	public createdBy: string;
	public prompt: IPrompt;
	readonly type = Type.SystemPrompt as const;

	constructor({ meta, prompt }: ISystemPromptParams) {
		this.name = meta.name;
		this.description = meta.description ?? '';
		this.createdBy = meta.createdBy ?? '';
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
