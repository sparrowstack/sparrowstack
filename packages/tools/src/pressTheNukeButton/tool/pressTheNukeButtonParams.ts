import { type IToolParams } from '@sparrowstack/tool';
import { pressTheNukeButton } from '@tools/pressTheNukeButton/function/pressTheNukeButton';

export const pressTheNukeButtonParams: IToolParams = {
	name: 'pressTheNukeButton',
	description:
		'When the user asks you to "press the nuke button" or similar, use this tool.',
	function: async () => {
		return await pressTheNukeButton();
	},
	parameters: {},
	needsPermission: {
		user: true,
		agent: true,
		message: 'Are you sure you want to PRESS THE NUKE BUTTON??',
	},
};
