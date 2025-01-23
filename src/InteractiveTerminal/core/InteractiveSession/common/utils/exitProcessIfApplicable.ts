interface IParams {
	input: string;
}

export const exitProcessIfApplicable = ({ input }: IParams) => {
	if (
		input.toLowerCase() === 'q' ||
		input.toLowerCase() === 'quit' ||
		input.toLowerCase() === 'exit'
	) {
		process.exit(0);
	}
};
