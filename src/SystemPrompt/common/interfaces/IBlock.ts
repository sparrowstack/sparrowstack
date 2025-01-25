import type { IItemOptions } from '@SystemPrompt/common/interfaces/IItemOptions';

export interface IBlock {
	title: string;
	items: string[];
	itemOptions?: IItemOptions;
	examples?: string[];
}
