import { Provider, AnthropicModel } from '../../common/enums';

export interface IBaseLLM {
	provider: Provider;
	model: AnthropicModel;
	sendMessage: ({ message }: { message: string }) => Promise<any>;
}
