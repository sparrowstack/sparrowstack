import { AgentLogger } from '@AgentLogger/AgentLogger';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { validateCommandLineArgs } from '@InteractiveTerminal/core/Validate/classMethods';

export class Validate {
	static commandLineArgs({
		logger,
		commandLineArgs,
	}: {
		logger: AgentLogger;
		commandLineArgs: ICommandLineArgs;
	}) {
		return validateCommandLineArgs({ logger, commandLineArgs });
	}
}
