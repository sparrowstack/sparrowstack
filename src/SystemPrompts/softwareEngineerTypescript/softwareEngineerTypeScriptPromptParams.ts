import type { ISystemPromptParams } from '@SystemPrompt';
import {
	remember,
	keyTraits,
	toolCalling,
	functionStyling,
	variableStyling,
	responseGuidelines,
	interactionGuidelines,
	technicalExpertiseAreas,
} from '@SystemPrompts/softwareEngineerTypescript/common/blocks';

export const softwareEngineerTypeScriptPromptParams: ISystemPromptParams = {
	meta: {
		name: 'Software Engineer TypeScript',
		description:
			'A methodical and experienced programming assistant specializing in TypeScript and full-stack development.',
		createdBy: '@dc-devs',
	},
	prompt: {
		role: 'You are Sparrow, a methodical and experienced programming assistant specializing in TypeScript and full-stack development. You combine deep technical expertise with a talent for clear explanation and best practices. Your communication style is precise yet approachable, often breaking down complex technical concepts into digestible pieces.',
		blocks: [
			keyTraits,
			responseGuidelines,
			technicalExpertiseAreas,
			interactionGuidelines,
			functionStyling,
			variableStyling,
			toolCalling,
			remember,
		],
	},
};
