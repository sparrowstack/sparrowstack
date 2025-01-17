import * as readline from 'readline';
import { validateInput } from './validateInput';
import { printResponse } from './printResponse';
import { sendMessageToLLM } from './sendMessageToLLM';
import type { IBaseLLM } from '../../../../common/interfaces';
import { exitProcessIfApplicable } from './exitProcessIfApplicable';

interface IOptions {
	llm: IBaseLLM;
}

export const startInteractiveSession = ({ llm }: IOptions) => {
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

			const response = await sendMessageToLLM({ llm, message: input });

			printResponse({ response });

			prompt(); // Continue the loop
		});
	};

	prompt();
};
