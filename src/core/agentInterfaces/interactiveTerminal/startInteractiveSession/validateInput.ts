import chalk from 'chalk';

interface IOptions {
	input: string;
}

export const validateInput = ({ input }: IOptions) => {
	const isValid = input !== '';

	if (!isValid) {
		console.log(chalk.dim('[Please enter a valid input]'));
		console.log('');
	}

	return isValid;
};
