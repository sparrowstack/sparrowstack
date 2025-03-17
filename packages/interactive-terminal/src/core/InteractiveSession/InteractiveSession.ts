import * as readline from 'readline';
import { Agent } from '@sparrowstack/agent';
import { userPrompt } from '@core/InteractiveSession/common/constants/userPrompt';
import {
	printHeader,
	validateInput,
	printAgentResponse,
	exitProcessIfApplicable,
	formatForSparrowResponse,
} from '@core/InteractiveSession/common/utils';

interface IParams {
	agent: Agent;
}

const buildRequestPermission = ({
	rl,
}: {
	rl: readline.Interface;
}): (({ message }: { message: string }) => Promise<boolean>) => {
	const requestPermissionFunction = ({
		message,
	}: {
		message: string;
	}): Promise<boolean> => {
		return new Promise((resolve) => {
			const question = `${message} (y/n): `;
			const formattedQuestion = formatForSparrowResponse({
				message: question,
			});

			rl.question(formattedQuestion, (answer: string) => {
				const isY = answer.toLowerCase() === 'y';
				const isYes = answer.toLowerCase() === 'yes';
				const userGavePermission = isY || isYes;

				resolve(userGavePermission);
			});
		});
	};

	return requestPermissionFunction;
};

export class InteractiveSession {
	agent: Agent;
	private rl: readline.Interface;

	constructor({ agent }: IParams) {
		this.rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		this.agent = agent;

		this.agent.setRequestPermissionHandler(
			buildRequestPermission({ rl: this.rl }),
		);
	}

	public start() {
		const prompt = () => {
			this.rl.question(userPrompt, async (input) => {
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
