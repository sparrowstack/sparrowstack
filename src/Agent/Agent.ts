import { getProvider } from './common/utils';
import type { IBaseLLM } from '../common/interfaces';
import { Provider, AnthropicModel } from '../common/enums';
import { InteractiveTerminal } from '../core/agentInterfaces';

interface IConstructorOptions {
	apiKey: string;
	provider: Provider;
	model: AnthropicModel;
}

export class Agent {
	llm: IBaseLLM;

	constructor({ provider, model, apiKey }: IConstructorOptions) {
		const llm = getProvider({ provider });

		this.llm = new llm({ model, apiKey });
	}

	async sendMessage({ message }: { message: string }) {
		return await this.llm.sendMessage({ message });
	}

	async startInteractiveTerminal() {
		const interactiveTerminal = new InteractiveTerminal({ llm: this.llm });
		await interactiveTerminal.start();
	}
}
