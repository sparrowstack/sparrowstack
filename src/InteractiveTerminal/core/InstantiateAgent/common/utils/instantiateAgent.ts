import { Agent } from '../../../../../Agent';
import type { ICommandLineArgs } from '../interfaces';
import { AgentLogger } from '../../../../../AgentLogger';
import { getCommandLineArgs, getAndValidateAgentParams } from '.';

interface IOptions {
	logger: AgentLogger;
}

export const instantiateAgent = ({ logger }: IOptions) => {
	const commandLineArgs = getCommandLineArgs<ICommandLineArgs>();
	const agentParams = getAndValidateAgentParams({
		logger,
		commandLineArgs,
	});

	return new Agent(agentParams);
};
