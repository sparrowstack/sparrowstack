import * as readline from 'readline';
import { Agent, BaseLLM } from '@Agent';
import {
	printHeader,
	validateInput,
	printAgentResponse,
	exitProcessIfApplicable,
} from '@InteractiveTerminal/core/InteractiveSession/common/utils';

interface IParams {
	agent: Agent;
}

export class InteractiveSession {
	llm: BaseLLM;

	constructor({ agent }: IParams) {
		this.llm = agent.llm;
	}

	public start() {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		const prompt = () => {
			rl.question('You: ', async (input) => {
				const message = input.trim();
				const isValid = validateInput({
					input: message,
					onInvalid: prompt,
				});

				if (!isValid) {
					return;
				}

				exitProcessIfApplicable({ input: message });

				const { text } = await this.llm.sendMessage({
					message,
				});

				printAgentResponse({ response: text });

				prompt();
			});
		};

		console.clear();
		printHeader({ llm: this.llm });
		prompt();
	}
}
