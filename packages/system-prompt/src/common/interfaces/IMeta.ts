export interface IMeta {
	name: string;
	description?: string;
	createdBy?: string;
	[key: string]: string | undefined;
}
