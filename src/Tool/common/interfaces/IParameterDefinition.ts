import { PropertyType } from '@Tool/common/enums';

export interface IParameterDefinition {
	type: PropertyType;
	description: string;
	enum?: string[];
	required?: boolean;
	properties?: Record<string, IParameterDefinition>; // For nested objects
}
