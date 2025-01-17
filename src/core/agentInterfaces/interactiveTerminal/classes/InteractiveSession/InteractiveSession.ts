import * as readline from 'readline';
import { BaseLLM } from '../../../../llms/BaseLLM';
import {
	printContext,
	validateInput,
	sendMessageToLLM,
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
				input = input.trim();

				exitProcessIfApplicable({ input });

				const isValid = validateInput({ input });

				if (!isValid) {
					prompt();
					return;
				}

				const responseMessage = await sendMessageToLLM({
					llm: this.llm,
					message: input,
				});
				const responseText = this.llm.getTextFromResponseMessage({
					responseMessage,
				});

				// TODO: Print if verbose
				printContext({ llm: this.llm });
				printAgentResponse({ response: responseText });

				prompt(); // Continue the loop
			});
		};

		prompt();
	}
}
