import type { IBlock } from '@SystemPrompt/common/interfaces';

export interface IPrompt {
	role: string;
	blocks?: IBlock[];
}
