import { Agent } from '@/packages/agent/Agent';
import { Logger } from '@/packages/logger/Logger';
import { InteractiveSession } from '@/packages/interactive-terminal/core';

interface IConstructorParams {
	agent: Agent;
}

export class InteractiveTerminal {
	agent: Agent;
	logger = new Logger({ context: 'InteractiveTerminal' });

	constructor({ agent }: IConstructorParams) {
		this.agent = agent;
	}

	public start() {
		const interactiveSession = new InteractiveSession({
			agent: this.agent,
		});

		interactiveSession.start();
	}
}
