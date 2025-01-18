import * as readline from 'readline';
import { BaseLLM } from '../../../Agent';
import {
	validateInput,
	printAgentResponse,
	exitProcessIfApplicable,
} from './common/utils';

interface IOptions {
	llm: BaseLLM;
}

export class InteractiveSession {
	llm: BaseLLM;

	constructor({ llm }: IOptions) {
		this.llm = llm;
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

				const { contentText } = await this.llm.sendMessage({
					message,
				});

				printAgentResponse({ response: contentText });

				prompt();
			});
		};

		prompt();
	}
}
