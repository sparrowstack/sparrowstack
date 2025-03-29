interface IParams {
	input: string;
}

export const exitProcessIfApplicable = ({ input }: IParams) => {
	const message = input.toLowerCase();

	if (message === 'q' || message === 'quit' || message === 'exit') {
		process.exit(0);
	}
};
