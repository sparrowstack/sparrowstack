import type { Block } from '@system-prompt/common/interfaces';

export interface Prompt {
	role: string;
	blocks?: Block[];
}
