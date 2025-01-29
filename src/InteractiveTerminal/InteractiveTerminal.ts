import { Agent } from '@Agent/Agent';
import { Logger } from '@Logger/Logger';
import { InteractiveSession } from '@InteractiveTerminal/core';

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
