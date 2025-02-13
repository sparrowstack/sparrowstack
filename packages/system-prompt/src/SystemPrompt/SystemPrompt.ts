import { Type } from '@system-prompt/common/enums';
import { toFormattedPrompt } from '@system-prompt/common/promptAdapters';
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

	public getPrompt(): string {
		return toFormattedPrompt({ prompt: this.prompt });
	}
}
