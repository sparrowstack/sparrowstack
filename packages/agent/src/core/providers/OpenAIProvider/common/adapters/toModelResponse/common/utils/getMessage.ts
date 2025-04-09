import { OpenAI } from 'openai';

interface IParams {
	response: OpenAI.Responses.Response;
}
export const getMessage = ({ response }: IParams) => {
	const { output } = response;
	const message = output.find((item) => item.type === 'message');
	const { content } = message || {};
	let contentText = '';

	if (Array.isArray(content) && content.length > 0) {
		const contentItem = content.find((item) => item.type === 'output_text');

		contentText = contentItem?.text || '';
	}

	return { contentText, ...message };
};

// Example output
// OpenAI.Responses.Response
// {
// 	output: [
// 		{
// 			type: 'reasoning',
// 			id: 'rs_67f5384a667c8191a67240b20a541ad8038a12dc60f8fafc',
// 			summary: [],
// 		},
// 		{
// 			type: 'message',
// 			id: 'msg_67f5384ac69c81918c6823b94a0c2773038a12dc60f8fafc',
// 			status: 'completed',
// 			role: 'assistant',
// 			content: [
// 				{
// 					type: 'output_text',
// 					text: 'Hello! How can I help you today?',
// 					annotations: [],
// 				},
// 			],
// 		},
// 	],
// };
