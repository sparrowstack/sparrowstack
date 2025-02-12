import type { IBlock, IItemOptions } from '@system-prompt/common/interfaces';

export type IBasePrompt = Record<
	IBlock['title'],
	{
		items: string[];
		itemOptions?: IItemOptions;
		examples?: string[];
	}
>;
