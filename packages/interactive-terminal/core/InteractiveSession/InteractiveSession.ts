import { Agent } from '@/packages/agent';
import * as readline from 'readline';
import { userPrompt } from '@/packages/interactive-terminal/core/InteractiveSession/common/constants/userPrompt';
import {
	printHeader,
	validateInput,
	printAgentResponse,
	exitProcessIfApplicable,
} from '@/packages/interactive-terminal/core/InteractiveSession/common/utils';

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
			rl.question(userPrompt, async (input) => {
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
