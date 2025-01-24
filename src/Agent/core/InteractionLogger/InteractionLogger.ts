import { Logger } from '@Logger';
import {
	logMessages,
	logContextWindow,
	logModelResponse,
} from '@InteractionLogger/common/loggers';
import type { IChatMessage } from '@ChatMessage';
import type { BaseLLM } from '@Agent/core/llms/BaseLLM/BaseLLM';
import type { IModelResponse } from '@Agent/core/llms/BaseLLM/common/interfaces';

interface IConstructorParams {
	logger: Logger;
}

export class InteractionLogger {
	private readonly logger: Logger;

	constructor({ logger }: IConstructorParams) {
		this.logger = logger;
	}

	public logMessages({ messages }: { messages: IChatMessage[] }) {
		logMessages({ messages, logger: this.logger });
	}

	public logContextWindow({ llm }: { llm: BaseLLM }) {
		logContextWindow({
			logger: this.logger,
			systemPrompt: llm.systemPrompt,
			messages: llm.chatMessageManager.getMessages(),
		});
	}

	public logModelResponse({ message }: { message: IModelResponse }) {
		logModelResponse({ message, logger: this.logger });
	}
}
