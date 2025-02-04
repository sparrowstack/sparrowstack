import type {
	IMeta,
	IPrompt,
} from '@/packages/system-prompt/common/interfaces';

export interface ISystemPromptParams {
	meta: IMeta;
	prompt: IPrompt;
}
