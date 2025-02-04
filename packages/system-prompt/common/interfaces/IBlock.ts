import type { IItemOptions } from '@/packages/system-prompt/common/interfaces/IItemOptions';

export interface IBlock {
	title: string;
	items: string[];
	itemOptions?: IItemOptions;
	examples?: string[];
}
