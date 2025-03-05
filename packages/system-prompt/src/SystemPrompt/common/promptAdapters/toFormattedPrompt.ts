import type { IPrompt } from '@system-prompt/common/interfaces';
import { toBasePrompt } from '@system-prompt/common/promptAdapters/toBasePrompt';

interface IParams {
	prompt: IPrompt;
}

export const toFormattedPrompt = ({ prompt }: IParams) => {
	let formattedPrompt = `${prompt.role}\n\n`;
	const basePrompt = toBasePrompt({ prompt });

	Object.entries(basePrompt).forEach(([title, block]) => {
		// Add items - either flattened or bulleted
		if (block.itemOptions?.flatten) {
			// Add title and flattened items
			formattedPrompt += `${title}: ${block.items.join(' ')}\n`;
		} else {
			// Add title
			formattedPrompt += `${title}:\n`;

			// Add items
			block.items.forEach((item) => {
				formattedPrompt += `- ${item}\n`;
			});
		}

		// Add examples
		if (block.examples) {
			formattedPrompt += `\n`;
			formattedPrompt += `${title} Examples:\n`;
			formattedPrompt += `${block.examples.join('\n')}\n`;
		}

		formattedPrompt += '\n';
	});

	return formattedPrompt.trim();
};
