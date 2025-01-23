import { Agent } from '@Agent/Agent';
import { Logger } from '@Logger/Logger';
import { getCommandLineArgs } from '@InteractiveTerminal/common/utils';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import {
	Validate,
	InstantiateAgent,
	InteractiveSession,
} from '@InteractiveTerminal/core';

interface IConstructorOptions {
	agent?: Agent;
}

export class InteractiveTerminal {
	agent: Agent;
	logger = new Logger('InteractiveTerminal');

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
