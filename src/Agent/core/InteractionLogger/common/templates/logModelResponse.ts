import chalk from 'chalk';
import type { IModelResponse } from '@Agent/common/interfaces';

interface IParams {
	message: IModelResponse;
}

export const modelResponseTemplate = ({ message }: IParams) => {
	return chalk.dim(`
------------------------------------ 
Model Response:
------------------------------------
${JSON.stringify(message, null, 2)}
`);
};
