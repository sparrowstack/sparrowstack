// TODO: Move to Agent
enum ApiKeys {
	OpenAI = 'OPENAI_API_KEY',
	Anthropic = 'ANTHROPIC_API_KEY',
}

// TODO: Move to Agent
interface IProviderApiKeys {
	openai: string | undefined;
	anthropic: string | undefined;
	[key: string]: string | undefined;
}
// TODO: Move to Agent
const providerApiKeys: IProviderApiKeys = {
	openai: process.env[ApiKeys.OpenAI],
	anthropic: process.env[ApiKeys.Anthropic],
};

interface IOptions {
	provider: string;
}

export const getApiKey = ({ provider }: IOptions) => {
	const apiKey = providerApiKeys[provider];

	return apiKey;
};
