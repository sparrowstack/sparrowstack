export interface CommandLineArgs {
	model: string;
	provider: string;
	systemPrompt: string;
	[key: string]: string;
}
