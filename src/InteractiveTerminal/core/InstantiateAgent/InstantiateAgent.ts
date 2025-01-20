import { instantiateAgent } from './core';
import type { AgentLogger } from '../../../AgentLogger';
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
		const agent = instantiateAgent({ logger, commandLineArgs });

		return agent;
	}
}
