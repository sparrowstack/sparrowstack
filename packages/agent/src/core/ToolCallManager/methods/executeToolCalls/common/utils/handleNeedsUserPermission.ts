import type { Tool } from '@sparrowstack/tool';
export const handleNeedsUserPermission = async ({
	tool,
	onRequestPermission,
}: {
	tool: Tool;
	onRequestPermission?: ({
		message,
	}: {
		message: string;
	}) => Promise<boolean>;
}) => {
	let hasPermission = true;

	if (tool.needsPermission?.user && onRequestPermission) {
		const message =
			tool.needsPermission?.permissionMessage ||
			`Are you sure you want to call ${name}?`;

		hasPermission = await onRequestPermission({
			message,
		});
	}

	return hasPermission;
};
