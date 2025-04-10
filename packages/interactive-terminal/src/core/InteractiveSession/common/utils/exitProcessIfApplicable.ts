interface Params {
	input: string;
}

export const exitProcessIfApplicable = ({ input }: Params) => {
	const message = input.toLowerCase();

	if (message === 'q' || message === 'quit' || message === 'exit') {
		process.exit(0);
	}
};
