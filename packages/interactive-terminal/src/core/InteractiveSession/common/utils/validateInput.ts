import chalk from 'chalk';

interface ValidateInputParams {
	input: string;
	onInvalid?: () => void;
}

export const validateInput = ({
	input,
	onInvalid,
}: ValidateInputParams): boolean => {
	const isValidInput = input.length > 0;

	if (!isValidInput) {
		console.log(chalk.dim('[Please enter a valid input]'));
		console.log('');

		if (onInvalid) {
			onInvalid();
		}
	}

	return isValidInput;
};
