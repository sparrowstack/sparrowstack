import { Logger } from '@Logger/Logger';
import type { ICommandLineArgs } from '@InteractiveTerminal/common/interfaces';
import { validateCommandLineArgs } from '@Validate/classMethods';

export class Validate {
	static commandLineArgs({
		logger,
		commandLineArgs,
	}: {
		logger: Logger;
		commandLineArgs: ICommandLineArgs;
	}) {
		return validateCommandLineArgs({ logger, commandLineArgs });
	}
}
