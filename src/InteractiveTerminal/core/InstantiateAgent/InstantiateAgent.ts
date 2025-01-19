import { instantiateAgent } from './common/utils';
import type { AgentLogger } from '../../../AgentLogger';

interface IConstructorOptions {
	logger: AgentLogger;
}

export class InstantiateAgent {
	logger: AgentLogger;

	constructor({ logger }: IConstructorOptions) {
		this.logger = logger;
	}

	public start() {
		const agent = instantiateAgent({ logger: this.logger });

		return agent;
	}
}
