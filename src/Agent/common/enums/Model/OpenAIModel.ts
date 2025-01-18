export enum OpenAIModel {
	GPT4o = 'gpt-4o',
	GPT4oMini = 'gpt-4o-mini',
	O1 = 'o1',
	O1Mini = 'o1-mini',
	O1Preview = 'o1-preview',
}

// Reverse mapping of OpenAIModel to OpenAIModelName
export const OpenAIModelName: {
	[key: string]: keyof typeof OpenAIModel;
} = Object.entries(OpenAIModel).reduce(
	(acc, [key, value]) => ({
		...acc,
		[value]: key,
	}),
	{},
);
