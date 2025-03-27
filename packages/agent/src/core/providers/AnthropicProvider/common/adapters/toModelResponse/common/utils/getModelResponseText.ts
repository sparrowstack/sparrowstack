import { Anthropic } from '@anthropic-ai/sdk';
import { ContentType } from '@core/providers/AnthropicProvider/common/enums';

interface IParams {
	response: Anthropic.Messages.Message;
}

export const getModelResponseText = ({ response }: IParams) => {
	let text = '';
	let type = '';

	const textContent = response.content.find(
		(content) => content.type === ContentType.Text,
	) as Anthropic.Messages.TextBlock;

	if (textContent) {
		text = textContent.text;
		type = textContent.type;
	}

	return { text, type };
};
