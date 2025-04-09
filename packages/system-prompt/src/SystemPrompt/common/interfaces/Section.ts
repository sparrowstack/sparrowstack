import type { BulletOptions } from '@system-prompt/common/interfaces/BulletOptions';

export interface Section {
	title: string;
	bullets: string[];
	examples?: string[];
	bulletOptions?: BulletOptions;
}
