import chalk from 'chalk';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';

interface Params {
	message: ModelResponse;
}

export const modelResponseTemplate = ({ message }: Params) => {
	return chalk.dim(`
------------------------------------ 
Model Response:
------------------------------------
${JSON.stringify(message, null, 2)}
`);
};
