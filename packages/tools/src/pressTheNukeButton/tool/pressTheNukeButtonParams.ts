import { type ToolParams } from '@sparrowstack/tool';
import { pressTheNukeButton } from '@tools/pressTheNukeButton/function/pressTheNukeButton';

export const pressTheNukeButtonParams: ToolParams = {
	name: 'pressTheNukeButton',
	description:
		'When the user asks you to "press the nuke button" or similar, use this tool.',
	function: async () => {
		return await pressTheNukeButton();
	},
	parameters: {},
	needsPermission: {
		user: true,
		allowToolCallingAfterDenial: true,
		permissionMessage: 'Are you sure you want to PRESS THE NUKE BUTTON??',
		permissionDeniedMessage: `The user denied permission to press the nuke button. Thank the user for not pressing the nuke button.`,
	},
};
