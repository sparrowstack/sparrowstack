import { Agent } from '../Agent';
import { AgentLogger } from '../AgentLogger';
import { InstantiateAgent, InteractiveSession } from './core';

interface IConstructorOptions {
	agent?: Agent;
}

export class InteractiveTerminal {
	agent: Agent;
	logger = new AgentLogger('InteractiveTerminal');

	constructor({ agent }: IConstructorOptions = {}) {
		if (agent) {
			this.agent = agent;
		} else {
			this.agent = new InstantiateAgent({ logger: this.logger }).start();
		}
	}

	public start() {
		new InteractiveSession({ agent: this.agent }).start();
	}
}
