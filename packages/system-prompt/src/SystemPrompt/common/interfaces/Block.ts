import type { ItemOptions } from '@system-prompt/common/interfaces/ItemOptions';

export interface Block {
	title: string;
	items: string[];
	itemOptions?: ItemOptions;
	examples?: string[];
}
