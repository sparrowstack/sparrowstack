import { AgentLogger } from '../../../AgentLogger';
import { validateCommandLineArgs } from './classMethods';
import type { ICommandLineArgs } from '../../common/interfaces';

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
