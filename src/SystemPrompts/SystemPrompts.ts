import { Default } from '@SystemPrompts/prompts/Default';
import { SoftwareEngineerTypeScript } from '@SystemPrompts/prompts/SoftwareEngineerTypeScript';

interface ISystemPrompts {
	Default: string;
	SoftwareEngineerTypeScript: string;
	[key: string]: string;
}

export const SystemPrompts: ISystemPrompts = {
	Default,
	SoftwareEngineerTypeScript,
};
