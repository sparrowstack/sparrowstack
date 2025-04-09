import type { Prompt } from '@system-prompt/common/interfaces';
import type { BasePrompt } from '@system-prompt/common/types';

export const toBasePrompt = ({ prompt }: { prompt: Prompt }) => {
	const basePrompt: BasePrompt = {};

	prompt?.sections?.forEach((section) => {
		// Get bulletOptions options
		const bulletOptions = section.bulletOptions;
		// Create a copy of bullets array to avoid mutating the original
		let bullets = [...section.bullets];

		// Randomize bullets if specified
		if (bulletOptions?.randomize) {
			bullets = bullets.sort(() => Math.random() - 0.5);
		}

		// Apply maxCount limit if specified
		if (bulletOptions?.maxCount) {
			bullets = bullets.slice(0, bulletOptions.maxCount);
		}

		basePrompt[section.title] = {
			bullets,
			...(bulletOptions && { bulletOptions }),
			...(section.examples && { examples: section.examples }),
		};
	});

	return basePrompt;
};
