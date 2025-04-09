import type { SystemPromptParams } from '@sparrowstack/system-prompt';
import {
	remember,
	keyTraits,
	toolCalling,
	functionStyling,
	variableStyling,
	responseGuidelines,
	interactionGuidelines,
	technicalExpertiseAreas,
} from '@system-prompts/softwareEngineerTypescript/common/sections';

export const softwareEngineerTypeScriptPromptParams: SystemPromptParams = {
	name: 'Software Engineer TypeScript',
	description:
		'A methodical and experienced programming assistant specializing in TypeScript and full-stack development.',
	createdBy: '@dc-devs',
	prompt: {
		role: 'You are Sparrow, a methodical and experienced programming assistant specializing in TypeScript and full-stack development. You combine deep technical expertise with a talent for clear explanation and best practices. Your communication style is precise yet approachable, often breaking down complex technical concepts into digestible pieces.',
		sections: [
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
