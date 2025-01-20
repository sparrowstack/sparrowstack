import { ApiKeys } from '@Agent/common/enums';

interface IProviderNameApiKeys {
	openai: string | undefined;
	anthropic: string | undefined;
	[key: string]: string | undefined;
}

export const ProviderNameApiKeys: IProviderNameApiKeys = {
	openai: process.env[ApiKeys.OpenAI],
	anthropic: process.env[ApiKeys.Anthropic],
};
