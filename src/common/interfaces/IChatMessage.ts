import { Role } from '../enums';

export interface IChatMessage {
	role: Role;
	content: string;
}
