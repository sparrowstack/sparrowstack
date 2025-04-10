import { PropertyType } from '@tool/common/enums';

export interface ParameterDefinition {
	type: PropertyType;
	description: string;
	enum?: string[];
	required?: boolean;
	properties?: Record<string, ParameterDefinition>; // For nested objects
}
