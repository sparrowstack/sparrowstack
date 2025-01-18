export const getCommandLineArgs = <
	ReturnValue = Record<string, string>,
>(): ReturnValue => {
	const args: Record<string, string> = {};
	const argv = process.argv.slice(2);

	for (let i = 0; i < argv.length; i++) {
		const arg = argv[i];

		if (arg.startsWith('--')) {
			// Handle --key=value style
			if (arg.includes('=')) {
				const [key, value] = arg.slice(2).split('=');
				args[key] = value;
			}
			// Handle --key value style
			else {
				const key = arg.slice(2);
				const value = argv[i + 1];
				if (value && !value.startsWith('--')) {
					args[key] = value;
					i++; // Skip next argument since we used it as a value
				}
			}
		}
	}

	return args as unknown as ReturnValue;
};
