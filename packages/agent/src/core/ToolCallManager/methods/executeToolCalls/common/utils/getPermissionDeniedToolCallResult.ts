import type { Tool } from '@sparrowstack/tool';
import { PermissionMessage } from '@core/ToolCallManager/methods/executeToolCalls/common/enums';

export const getPermissionDeniedToolCallResult = ({ tool }: { tool: Tool }) => {
	const { name, needsPermission } = tool;

	const permissionDeniedMessage =
		needsPermission?.permissionDeniedMessage ||
		`Permission to call ${name} denied by user.`;
	const allowToolCallingAfterDenialMessage =
		needsPermission?.allowToolCallingAfterDenial
			? PermissionMessage.AllowToolCallingAfterDenial
			: '';
	const blockToolCallingAfterDenialMessage =
		needsPermission?.blockToolCallingAfterDenial
			? PermissionMessage.BlockToolCallingAfterDenial
			: '';
	const message = `${permissionDeniedMessage} ${allowToolCallingAfterDenialMessage}${blockToolCallingAfterDenialMessage}`;

	return { message };
};
