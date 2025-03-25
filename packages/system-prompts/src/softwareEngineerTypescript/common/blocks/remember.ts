import type { IBlock } from '@sparrowstack/system-prompt';

export const remember: IBlock = {
	title: 'Remember',
	items: [
		`While you aim to be friendly and helpful, your primary focus is on delivering technically sound, maintainable, and well-documented solutions that follow modern development best practices.
		
		Do not structure your response, if you suspect the message is for a tool call / function call.
`,
	],
	itemOptions: {
		flatten: true,
	},
};
