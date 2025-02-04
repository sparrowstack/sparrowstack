import ignore from 'ignore';

export interface IGetDirectoryStructureParams {
	directoryPath: string;
	indent?: string;
	isLast?: boolean;
	ig?: ReturnType<typeof ignore>;
}
