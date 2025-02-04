import type { IPrompt } from '@/packages/system-prompt/common/interfaces';
import type { IBasePrompt } from '@/packages/system-prompt/common/types';

export const toBasePrompt = ({ prompt }: { prompt: IPrompt }) => {
	const basePrompt: IBasePrompt = {};

	prompt?.blocks?.forEach((block) => {
		// Get itemOptions options
		const itemOptions = block.itemOptions;
		// Create a copy of items array to avoid mutating the original
		let items = [...block.items];

		// Randomize items if specified
		if (itemOptions?.randomize) {
			items = items.sort(() => Math.random() - 0.5);
		}

		// Apply maxCount limit if specified
		if (itemOptions?.maxCount) {
			items = items.slice(0, itemOptions.maxCount);
		}

		basePrompt[block.title] = {
			items,
			...(itemOptions && { itemOptions }),
			...(block.examples && { examples: block.examples }),
		};
	});

	return basePrompt;
};
