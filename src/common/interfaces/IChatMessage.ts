import { IRole } from '../enums';

export interface IChatMessage {
	role: IRole;
	content: string;
}
