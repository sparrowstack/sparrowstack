import util from 'util';
import chalk from 'chalk';
import 'dotenv/config';

interface Params {
	response: string;
	metadata?: Record<string, any>;
}

export const printAgentResponse = ({ response, metadata }: Params) => {
	const agentPrompt = `${chalk.greenBright('[Agent]:')} `;
	const agentMetaPrompt = `${chalk.dim('[Agent-Meta]:')} `;
	const agentMeta = chalk.dim(util.inspect(metadata, { depth: null }));
	const logAgentMeta = process.env.LOG_AGENT_META === 'true';

	console.log('');
	console.log(`${agentPrompt} ${response}`);
	if (logAgentMeta && metadata) {
		console.log('');
		console.log(`${agentMetaPrompt} ${agentMeta}`);
	}
	console.log('');
};
