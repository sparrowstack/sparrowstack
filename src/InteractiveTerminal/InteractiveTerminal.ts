import { Agent } from '../Agent';
import { AgentLogger } from '../AgentLogger';
import { InteractiveSession } from './core/InteractiveSession';
import { instantiateAgent } from './core/common/utils/instantiateAgent';

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
			this.agent = instantiateAgent({ logger: this.logger });
		}
	}

	public async start() {
		new InteractiveSession({ agent: this.agent }).start();
	}
}
