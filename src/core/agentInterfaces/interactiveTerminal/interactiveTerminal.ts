import { printHeader } from './common/utils';
import { BaseLLM } from '../../../core/llms/BaseLLM';
import { startInteractiveSession } from './common/startInteractiveSession';

interface IConstructorOptions {
	llm: BaseLLM;
}

export class InteractiveTerminal {
	private llm: BaseLLM;

	constructor({ llm }: IConstructorOptions) {
		this.llm = llm;
	}

	public async start() {
		console.clear();
		printHeader({ llm: this.llm });
		startInteractiveSession({ llm: this.llm });
	}
}
