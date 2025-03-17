import { Agent } from '@sparrowstack/agent';
import { Logger } from '@sparrowstack/logger';
import { InteractiveSession } from '@core';

interface ConstructorParams {
	agent: Agent;
}

export class InteractiveTerminal {
	agent: Agent;
	logger = new Logger({ context: 'InteractiveTerminal' });
	private interactiveSession: InteractiveSession;

	constructor({ agent }: ConstructorParams) {
		this.agent = agent;
		this.interactiveSession = new InteractiveSession({
			agent: this.agent,
		});
	}

	public start() {
		this.interactiveSession.start();
	}
}
