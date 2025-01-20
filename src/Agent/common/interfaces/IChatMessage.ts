import { Role } from '@Agent/common/enums';

export interface IChatMessage {
	role: Role;
	content: string;
}
