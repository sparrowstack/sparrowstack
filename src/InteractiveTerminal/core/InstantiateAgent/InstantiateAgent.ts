import type { AgentLogger } from '@AgentLogger';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { instantiateAgentWithCommandLineArgs } from '@InstantiateAgent/classMethods';

export class InstantiateAgent {
	constructor() {}

	static withCommandLineArgs({
		logger,
		commandLineArgs,
	}: {
		logger: AgentLogger;
		commandLineArgs: ICommandLineArgs;
	}) {
		return instantiateAgentWithCommandLineArgs({
			logger,
			commandLineArgs,
		});
	}
}
