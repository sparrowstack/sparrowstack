import type { IBlock, IItemOptions } from '@SystemPrompt/common/interfaces';

export type IBasePrompt = Record<
	IBlock['title'],
	{
		items: string[];
		itemOptions?: IItemOptions;
		examples?: string[];
	}
>;
