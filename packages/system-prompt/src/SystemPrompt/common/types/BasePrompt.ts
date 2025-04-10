import type { Section, BulletOptions } from '@system-prompt/common/interfaces';

export type BasePrompt = Record<
	Section['title'],
	{
		bullets: string[];
		bulletOptions?: BulletOptions;
		examples?: string[];
	}
>;
