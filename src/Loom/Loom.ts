import { getProvider } from './common/utils';
import type { ILLM } from '../common/interfaces';
import { Provider, AnthropicModel } from '../common/enums';
import { InteractiveAgent } from '../interactive';

interface IConstructorOptions {
	apiKey: string;
	provider: Provider;
	model: AnthropicModel;
}

export class Loom {
	llm: ILLM;

	constructor({ provider, model, apiKey }: IConstructorOptions) {
		const llm = getProvider({ provider });

		this.llm = new llm({ model, apiKey });
	}

	async sendMessage({ message }: { message: string }) {
		return await this.llm.sendMessage({ message });
	}

	async startInteractive() {
		const agent = new InteractiveAgent({ llm: this.llm });
		await agent.start();
	}
}
