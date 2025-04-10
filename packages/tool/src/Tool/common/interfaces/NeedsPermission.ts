export interface NeedsPermission {
	user?: boolean;
	agent?: boolean;
	permissionMessage?: string;
	permissionDeniedMessage?: string;
	allowToolCallingAfterDenial?: boolean;
	blockToolCallingAfterDenial?: boolean;
}
