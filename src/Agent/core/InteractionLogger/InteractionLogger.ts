import { Logger } from '@Logger';
import type { Agent } from '@Agent';
import type { IChatMessage } from '@Agent/core/ChatMessage';
import type { IModelResponse } from '@Agent/common/interfaces';
import {
	messagesTemplate,
	contextWindowTemplate,
	modelResponseTemplate,
} from '@Agent/core/InteractionLogger/common/templates';

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

	public logContextWindow({ agent }: { agent: Agent }) {
		const contextWindow = contextWindowTemplate({
			systemPrompt: agent.systemPrompt.getPrompt(),
			messages: agent.chatMessageManager.getMessages(),
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
