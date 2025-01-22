import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@Agent/core/llms/AnthropicLLM/common/enums';

interface IOptions {
	message: Anthropic.Messages.Message;
}

export const getTextContent = ({ message }: IOptions) => {
	let text = '';
	let type = '';

	const textContent = message.content.find(
		(content) => content.type === ContentType.Text,
	);

	if (textContent) {
		text = textContent.text;
		type = textContent.type;
	}

	return { text, type };
};
