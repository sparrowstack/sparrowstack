export enum AnthropicModel {
	Claude35Sonnet = 'claude-3-5-sonnet-20241022',
}

// Reverse mapping of AnthropicModel to AnthropicModelName
export const AnthropicModelName: {
	[key: string]: keyof typeof AnthropicModel;
} = Object.entries(AnthropicModel).reduce(
	(acc, [key, value]) => ({
		...acc,
		[value]: key,
	}),
	{},
);
