import { Agent } from '@sparrowstack/agent';
import { Logger } from '@sparrowstack/logger';
import { InteractiveSession } from '@core';

interface ConstructorParams {
	agent: Agent;
}

export class InteractiveTerminal {
	agent: Agent;
	logger = new Logger({ context: 'InteractiveTerminal' });

	constructor({ agent }: ConstructorParams) {
		this.agent = agent;
	}

	public start() {
		const interactiveSession = new InteractiveSession({
			agent: this.agent,
		});

		interactiveSession.start();
	}
}
