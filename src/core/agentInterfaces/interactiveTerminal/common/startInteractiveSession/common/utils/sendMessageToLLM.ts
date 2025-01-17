import type { IBaseLLM } from '../../../../../../../common/interfaces';
import type { LLMResponseMessage } from '../../../../../../../common/types';

interface IOptions {
	llm: IBaseLLM;
	message: string;
}

export const sendMessageToLLM = async ({
	llm,
	message,
}: IOptions): Promise<LLMResponseMessage> => {
	let response: LLMResponseMessage = {} as LLMResponseMessage;

	try {
		response = await llm.sendMessage({
			message,
		});
	} catch (error) {
		console.error(error);
	}

	return response;
};
