import { BaseLLM } from '../BaseLLM';
import { Anthropic } from '@anthropic-ai/sdk';
import { defaultPrompt } from '../../systemPrompts';
import { AgentLogger } from '../../../../AgentLogger';
import { Provider, Model } from '../../../common/enums';
import type { ILLMResponseMessage } from '../../../common/interfaces';
import { infoLogContext, infoLogLLMResponseMessage } from './common/infoLogs';
import {
	sendContextToLLM,
	addUserMessageToMessages,
	addAssistantMessageToMessages,
} from './common/utils';

interface IContructorOptions {
	apiKey: string;
	model: Model;
	systemPrompt?: string;
}

export class AnthropicLLM extends BaseLLM {
	model: Model;
	maxTokens: number;
	systemPrompt: string;
	anthropic: Anthropic;
	provider = Provider.Anthropic;
	logger = new AgentLogger('AnthropicLLM');

	constructor({ model, apiKey, systemPrompt }: IContructorOptions) {
		super();

		this.model = model;
		this.maxTokens = 1024;
		this.systemPrompt = systemPrompt || defaultPrompt;

		this.anthropic = new Anthropic({
			apiKey,
		});
	}

	async sendMessage({
		message,
	}: {
		message: string;
	}): Promise<ILLMResponseMessage> {
		const messages = addUserMessageToMessages({ llm: this, message });

		infoLogContext({
			messages,
			logger: this.logger,
			systemPrompt: this.systemPrompt,
		});

		const responseMessage = await sendContextToLLM({
			llm: this,
			anthropic: this.anthropic,
		});

		infoLogLLMResponseMessage({
			logger: this.logger,
			message: responseMessage,
		});

		addAssistantMessageToMessages({
			llm: this,
			message: responseMessage.contentText,
		});

		return responseMessage;
	}
}
