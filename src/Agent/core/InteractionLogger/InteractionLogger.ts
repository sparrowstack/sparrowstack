import { Logger } from '@Logger';
import type { IChatMessage } from '@ChatMessage';
import type { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import type { IModelResponse } from '@Agent/core/ModelResponseAdapter/common/interfaces';
import {
	messagesTemplate,
	contextWindowTemplate,
	modelResponseTemplate,
} from '@InteractionLogger/common/templates';

interface IConstructorParams {
	logger: Logger;
}

export class InteractionLogger {
	private readonly logger: Logger;

	constructor({ logger }: IConstructorParams) {
		this.logger = logger;
	}

	public logMessages({
		messages: chatMessages,
	}: {
		messages: IChatMessage[];
	}) {
		const messages = messagesTemplate({ messages: chatMessages });

		console.log('');
		this.logger.info(messages);
	}

	public logContextWindow({ llm }: { llm: BaseLLM }) {
		const contextWindow = contextWindowTemplate({
			systemPrompt: llm.systemPrompt.getPrompt(),
			messages: llm.chatMessageManager.getMessages(),
		});

		console.log('');
		this.logger.info(contextWindow);
	}

	public logModelResponse({ message }: { message: IModelResponse }) {
		const modelResponse = modelResponseTemplate({ message });

		console.log('');
		this.logger.info(modelResponse);
	}
}
