import { Agent } from '../Agent';
import { AgentLogger } from '../AgentLogger';
import { getCommandLineArgs } from './common/utils';
import type { ICommandLineArgs } from './common/interfaces';
import { Validate, InteractiveSession, InstantiateAgent } from './core';

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
			const commandLineArgs = getCommandLineArgs<ICommandLineArgs>();

			const validatedCommandLineArgs = Validate.commandLineArgs({
				commandLineArgs,
				logger: this.logger,
			});

			this.agent = InstantiateAgent.withCommandLineArgs({
				logger: this.logger,
				commandLineArgs: validatedCommandLineArgs,
			});
		}
	}

	public start() {
		new InteractiveSession({ agent: this.agent }).start();
	}
}
