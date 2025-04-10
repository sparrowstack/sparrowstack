import type { Section } from '@system-prompt/common/interfaces';

export interface Prompt {
	role: string;
	sections?: Section[];
}
