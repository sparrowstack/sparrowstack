import ignore from 'ignore';

export interface GetDirectoryStructureParams {
	directoryPath: string;
	indent?: string;
	isLast?: boolean;
	ig?: ReturnType<typeof ignore>;
}
