import type { IBaseLLM } from '../../../../../../../common/interfaces';

interface IOptions {
	llm: IBaseLLM;
	message: string;
}

export const sendMessageToLLM = async ({ llm, message }: IOptions) => {
	let response: string = '';

	try {
		response = await llm.sendMessage({
			message,
		});
	} catch (error) {
		console.error(error);
	}

	return response;
};
