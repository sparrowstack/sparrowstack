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

// TODO: InteractiveSession Class?
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

			const responseMessage = await sendMessageToLLM({
				llm,
				message: input,
			});
			const responseText = llm.getTextFromResponseMessage({
				responseMessage,
			});

			// TODO: Print if verbose
			printContext({ llm });
			printAgentResponse({ response: responseText });

			prompt(); // Continue the loop
		});
	};

	prompt();
};
