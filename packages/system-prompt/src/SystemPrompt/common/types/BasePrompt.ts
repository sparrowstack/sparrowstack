import type { Block, ItemOptions } from '@system-prompt/common/interfaces';

export type BasePrompt = Record<
	Block['title'],
	{
		items: string[];
		itemOptions?: ItemOptions;
		examples?: string[];
	}
>;
