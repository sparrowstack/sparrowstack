import { Default } from './prompts/Default';
import { SoftwareEngineerTypeScript } from './prompts/SoftwareEngineerTypeScript';

interface ISystemPrompts {
	Default: string;
	SoftwareEngineerTypeScript: string;
	[key: string]: string;
}

export const SystemPrompts: ISystemPrompts = {
	Default,
	SoftwareEngineerTypeScript,
};
