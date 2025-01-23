import type { Logger } from '@Logger';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { instantiateAgentWithCommandLineArgs } from '@InstantiateAgent/classMethods';

export class InstantiateAgent {
	constructor() {}

	static withCommandLineArgs({
		logger,
		commandLineArgs,
	}: {
		logger: Logger;
		commandLineArgs: ICommandLineArgs;
	}) {
		return instantiateAgentWithCommandLineArgs({
			logger,
			commandLineArgs,
		});
	}
}
