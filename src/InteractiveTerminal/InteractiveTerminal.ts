import type { Agent } from '../Agent';
import { printHeader } from './common/utils';
import { BaseLLM } from '../Agent';
import { InteractiveSession } from './core/InteractiveSession';

interface IConstructorOptions {
	agent: Agent;
}

export class InteractiveTerminal {
	private llm: BaseLLM;

	constructor({ agent }: IConstructorOptions) {
		this.llm = agent.llm;
	}

	public async start() {
		console.clear();
		printHeader({ llm: this.llm });

		new InteractiveSession({ llm: this.llm }).start();
	}
}
