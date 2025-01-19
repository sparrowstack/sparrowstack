import { Agent } from '../../../../Agent';
import { AgentLogger } from '../../../../AgentLogger';
import type { ICommandLineArgs } from '../../../core/common/interfaces';
import {
	getCommandLineArgs,
	getAndValidateAgentParams,
} from '../../../core/common/utils';

interface IOptions {
	logger: AgentLogger;
}

export const instantiateAgent = ({ logger }: IOptions) => {
	const commandLineArgs = getCommandLineArgs<ICommandLineArgs>();
	const params = getAndValidateAgentParams({
		logger,
		commandLineArgs,
	});

	return new Agent(params);
};
