import chalk from 'chalk';
import type { ModelResponse } from '@core/providers/BaseProvider/common/interfaces';

interface IParams {
	message: ModelResponse;
}

export const modelResponseTemplate = ({ message }: IParams) => {
	return chalk.dim(`
------------------------------------ 
Model Response:
------------------------------------
${JSON.stringify(message, null, 2)}
`);
};
