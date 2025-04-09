import type { Prompt } from '@system-prompt/common/interfaces';
import { toBasePrompt } from '@system-prompt/common/promptAdapters/toBasePrompt';

interface Params {
	prompt: Prompt;
}

export const toFormattedPrompt = ({ prompt }: Params) => {
	let formattedPrompt = `${prompt.role}\n\n`;
	const basePrompt = toBasePrompt({ prompt });

	Object.entries(basePrompt).forEach(([title, section]) => {
		// Add bullets - either flattened or bulleted
		if (section.bulletOptions?.flatten) {
			// Add title and flattened bullets
			formattedPrompt += `${title}: ${section.bullets.join(' ')}\n`;
		} else {
			// Add title
			formattedPrompt += `${title}:\n`;

			// Add bullets
			section.bullets.forEach((bullet) => {
				formattedPrompt += `- ${bullet}\n`;
			});
		}

		// Add examples
		if (section.examples) {
			formattedPrompt += `\n`;
			formattedPrompt += `${title} Examples:\n`;
			formattedPrompt += `${section.examples.join('\n')}\n`;
		}

		formattedPrompt += '\n';
	});

	return formattedPrompt.trim();
};
