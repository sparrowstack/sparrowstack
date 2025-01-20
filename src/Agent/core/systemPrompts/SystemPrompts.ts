import { Default } from '@Agent/core/SystemPrompts/prompts/Default';
import { SoftwareEngineerTypeScript } from '@Agent/core/SystemPrompts/prompts/SoftwareEngineerTypeScript';

interface ISystemPrompts {
	Default: string;
	SoftwareEngineerTypeScript: string;
	[key: string]: string;
}

export const SystemPrompts: ISystemPrompts = {
	Default,
	SoftwareEngineerTypeScript,
};
