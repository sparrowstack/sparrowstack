export interface INeedsPermission {
	user?: boolean;
	agent?: boolean;
	permissionMessage?: string;
	permissionDeniedMessage?: string;
	allowToolCallingAfterDenial?: boolean;
	blockToolCallingAfterDenial?: boolean;
}
