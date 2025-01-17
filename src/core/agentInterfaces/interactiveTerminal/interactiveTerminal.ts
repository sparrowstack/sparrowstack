import type { IBaseLLM } from '../../../common/interfaces';
import { printHeader } from './common/utils';
import { startInteractiveSession } from './startInteractiveSession';

interface IConstructorOptions {
	llm: IBaseLLM;
}

export class InteractiveTerminal {
	private llm: IBaseLLM;

	constructor({ llm }: IConstructorOptions) {
		this.llm = llm;
	}

	public async start() {
		console.clear();
		printHeader({ llm: this.llm });
		startInteractiveSession({ llm: this.llm });
	}
}
