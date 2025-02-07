import type { IBlock } from '@system-prompt/common/interfaces';

export interface IPrompt {
	role: string;
	blocks?: IBlock[];
}
