import * as readline from 'readline';
import { Agent } from '@sparrowstack/agent';
import { userPrompt } from '@core/InteractiveSession/common/constants/userPrompt';
import {
	printHeader,
	validateInput,
	printAgentResponse,
	exitProcessIfApplicable,
} from '@core/InteractiveSession/common/utils';

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
