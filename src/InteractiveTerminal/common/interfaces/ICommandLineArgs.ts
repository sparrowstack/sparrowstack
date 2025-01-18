import { Provider } from '../../../Agent/common/enums';
import type { Model } from '../../../Agent/common/types';

export interface ICommandLineArgs {
	model: Model;
	provider: Provider;
	systemPrompt: string;
}
