interface IOptions {
	input: string;
}

export const exitProcessIfApplicable = ({ input }: IOptions) => {
	if (
		input.toLowerCase() === 'q' ||
		input.toLowerCase() === 'quit' ||
		input.toLowerCase() === 'exit'
	) {
		process.exit(0);
	}
};
