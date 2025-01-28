import { Agent } from '@Agent';
import * as readline from 'readline';
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
	agent: Agent;

	constructor({ agent }: IParams) {
		this.agent = agent;
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

				const { text } = await this.agent.sendMessage({
					message,
				});

				printAgentResponse({ response: text });

				prompt();
			});
		};

		console.clear();
		printHeader({ agent: this.agent });
		prompt();
	}
}
