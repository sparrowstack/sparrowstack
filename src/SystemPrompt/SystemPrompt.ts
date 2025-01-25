import { toFormattedPrompt } from '@SystemPrompt/common/promptAdapters';
import type {
	IPrompt,
	ISystemPromptParams,
} from '@SystemPrompt/common/interfaces';

export class SystemPrompt {
	public name: string;
	public description: string;
	public createdBy: string;
	public prompt: IPrompt;

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
