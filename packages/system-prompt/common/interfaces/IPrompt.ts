import type { IBlock } from '@/packages/system-prompt/common/interfaces';

export interface IPrompt {
	role: string;
	blocks?: IBlock[];
}
