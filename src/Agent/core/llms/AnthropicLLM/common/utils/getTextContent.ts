import { Anthropic } from '@anthropic-ai/sdk';

interface IOptions {
	message: Anthropic.Messages.Message;
}

export const getTextContent = ({ message }: IOptions) => {
	let text = '';
	let type = '';
	const content = message.content[0];

	// TODO: Could cause issues if tools?
	if (content.type === 'text') {
		text = content.text;
		type = content.type;
	}

	return { text, type };
};
