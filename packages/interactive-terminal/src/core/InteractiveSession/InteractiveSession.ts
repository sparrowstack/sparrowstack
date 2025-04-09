import * as readline from 'readline';
import { Agent } from '@sparrowstack/agent';
import { userPrompt } from '@core/InteractiveSession/common/constants/userPrompt';
import {
	printHeader,
	getResponse,
	validateInput,
	printAgentResponse,
	buildRequestPermission,
	exitProcessIfApplicable,
} from '@core/InteractiveSession/common/utils';

interface Params {
	agent: Agent;
}

export class InteractiveSession {
	agent: Agent;
	private rl: readline.Interface;

	constructor({ agent }: Params) {
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
			this.rl.question(userPrompt, async (inputRaw) => {
				const input = inputRaw.trim();
				const isValid = validateInput({
					input,
					onInvalid: prompt,
				});

				if (!isValid) {
					return;
				}

				exitProcessIfApplicable({ input });

				const { text } = await this.agent.sendMessage({
					message: input,
				});
				const { response, metadata } = getResponse({ output: text });

				printAgentResponse({ response, metadata });

				prompt();
			});
		};

		console.clear();
		printHeader({ agent: this.agent });
		prompt();
	}
}
