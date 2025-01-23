import { Role } from '@Agent/common/enums';
// import type { IToolCallContentResult } from '@Agent/common/interfaces/IToolCallContentResult';

export interface IChatMessage {
	role: Role;
	content: any; // string | IToolCallContentResult[];
}
