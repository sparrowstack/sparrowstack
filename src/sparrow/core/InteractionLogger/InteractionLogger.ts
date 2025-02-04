import { Logger } from '@logger';
import { SystemPrompt } from '@system-prompt';
import { ChatMessageManager } from '@sparrow/core/ChatMessageManager';
import type { IModelResponse } from '@sparrow/core/providers/BaseProvider/common/interfaces';
import {
	messagesTemplate,
	contextWindowTemplate,
	modelResponseTemplate,
} from '@sparrow/core/InteractionLogger/common/templates';

interface IConstructorParams {
	logger: Logger;
	systemPrompt: SystemPrompt;
	chatMessageManager: ChatMessageManager;
}

export class InteractionLogger {
	private readonly logger: Logger;
	private readonly systemPrompt: SystemPrompt;
	private readonly chatMessageManager: ChatMessageManager;

	constructor({
		logger,
		systemPrompt,
		chatMessageManager,
	}: IConstructorParams) {
		this.logger = logger;
		this.systemPrompt = systemPrompt;
		this.chatMessageManager = chatMessageManager;
	}

	public logChatMessages() {
		const chatMessages = this.chatMessageManager.getMessages();
		const messages = messagesTemplate({ messages: chatMessages });

		console.log('');
		this.logger.info(messages);
	}

	public logContextWindow() {
		const contextWindow = contextWindowTemplate({
			systemPrompt: this.systemPrompt.getPrompt(),
			messages: this.chatMessageManager.getMessages(),
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
