import type { AgentLogger } from '../../../AgentLogger';
import { instantiateAgentWithCommandLineArgs } from './classMethods';
import type { ICommandLineArgs } from '../../common/interfaces';

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
