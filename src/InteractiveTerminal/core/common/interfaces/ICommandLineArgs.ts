export interface ICommandLineArgs {
	model: string;
	provider: string;
	systemPrompt: string;
	[key: string]: string;
}
