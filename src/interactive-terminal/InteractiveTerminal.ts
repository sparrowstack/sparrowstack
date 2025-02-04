import { Agent } from '@agent/Agent';
import { Logger } from '@logger/Logger';
import { InteractiveSession } from '@interactive-terminal/core';

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
