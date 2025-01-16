import type { ILLM } from '../common/interfaces';

interface IConstructorOptions {
	llm: ILLM;
}

export class InteractiveAgent {
	private llm: ILLM;

	constructor({ llm }: IConstructorOptions) {
		this.llm = llm;
	}

	public async start() {
		console.log('Interactive AI Agent Started');
		console.log('Type "exit" or "quit" to end the conversation\n');

		process.stdout.write('User: ');

		for await (const line of console) {
			const input = line.trim();

			if (
				input.toLowerCase() === 'exit' ||
				input.toLowerCase() === 'quit'
			) {
				console.log('\nGoodbye!');
				process.exit(0);
			}

			try {
				const response = await this.llm.sendMessage({ message: input });
				console.log(
					`Assistant: ${JSON.stringify(response, null, 2)}\n`,
				);
			} catch (error) {
				console.error('Error:', error);
			}

			process.stdout.write('Assistant: ');
		}
	}
}
